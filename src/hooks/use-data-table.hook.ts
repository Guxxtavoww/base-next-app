'use client';

import { z } from 'zod';
import {
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnFiltersState,
  type PaginationState,
  type SortingState,
  type TableOptions,
  type TableState,
  type VisibilityState,
} from '@tanstack/react-table';
import { useState, useMemo, useEffect } from 'react';

import {
  optionalStringSchema,
  optionalStringToNumberSchema,
} from '@/utils/zod.utils';
import { useDebounce } from '@/hooks/use-debounce.hook';

import { useSearchParamsManager } from './use-search-params-manager.hook';

type UseDataTablePropsExteds<TData> = Omit<
  TableOptions<TData>,
  | 'pageCount'
  | 'getCoreRowModel'
  | 'manualFiltering'
  | 'manualPagination'
  | 'manualSorting'
> &
  Required<Pick<TableOptions<TData>, 'pageCount'>>;

interface UseDataTableProps<TData> extends UseDataTablePropsExteds<TData> {
  filterFields?: DataTableFilterField<TData>[];
  enableAdvancedFilter?: boolean;
  initialState?: Omit<Partial<TableState>, 'sorting'> & {
    sorting?: {
      id: Extract<keyof TData, string>;
      desc: boolean;
    }[];
  };
}

const searchParamsSchema = z.object({
  page: optionalStringToNumberSchema.default('1'),
  limit: optionalStringToNumberSchema,
  sort: optionalStringSchema,
});

export function useDataTable<TData>({
  pageCount = -1,
  filterFields = [],
  enableAdvancedFilter = false,
  ...props
}: UseDataTableProps<TData>) {
  const { setSearchParam, getAllParamsValues } = useSearchParamsManager([
    { key: 'page', defaultValue: '1' },
    { key: 'limit' },
    { key: 'sort' },
  ]);

  // Search params
  const search = searchParamsSchema.parse(getAllParamsValues());
  const page = search.page;
  const limit = search.limit ?? props.initialState?.pagination?.pageSize ?? 10;
  const sort =
    search.sort ??
    `${props.initialState?.sorting?.[0]?.id}.${
      props.initialState?.sorting?.[0]?.desc ? 'desc' : 'asc'
    }`;

  const [column, order] = sort?.split('.') ?? [];

  const { searchableColumns, filterableColumns } = useMemo(() => {
    return {
      searchableColumns: filterFields.filter((field) => !field.options),
      filterableColumns: filterFields.filter((field) => field.options),
    };
  }, [filterFields]);

  // Initial column filters
  const initialColumnFilters: ColumnFiltersState = useMemo(() => {
    return Object.entries(getAllParamsValues()).reduce<ColumnFiltersState>(
      (filters, [key, value]) => {
        const filterableColumn = filterableColumns.find(
          (column) => column.value === key
        );

        const searchableColumn = searchableColumns.find(
          (column) => column.value === key
        );

        if (filterableColumn) {
          filters.push({
            id: key,
            value: value!.split('.'),
          });
        } else if (searchableColumn) {
          filters.push({
            id: key,
            value: [value!],
          });
        }

        return filters;
      },
      []
    );
  }, [filterableColumns, searchableColumns, getAllParamsValues]);

  // Table states
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialColumnFilters);
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: page - 1,
    pageSize: limit,
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const [sorting, setSorting] = useState<SortingState>([
    {
      id: column ?? '',
      desc: order === 'desc',
    },
  ]);

  useEffect(() => {
    setSearchParam('page', (pageIndex + 1).toString());
    setSearchParam('limit', pageSize.toString());
    setSearchParam(
      'sort',
      sorting[0]?.id
        ? `${sorting[0]?.id}.${sorting[0]?.desc ? 'desc' : 'asc'}`
        : ''
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageIndex, pageSize, sorting]);

  const debouncedSearchableColumnFilters = JSON.parse(
    useDebounce(
      JSON.stringify(
        columnFilters.filter((filter) => {
          return searchableColumns.find((column) => column.value === filter.id);
        })
      ),
      500
    )
  ) as ColumnFiltersState;

  const filterableColumnFilters = columnFilters.filter((filter) => {
    return filterableColumns.find((column) => column.value === filter.id);
  });

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (enableAdvancedFilter) return;

    if (!mounted) return setMounted(true);

    for (const column of debouncedSearchableColumnFilters) {
      setSearchParam(column.id as any, column.value as string);
    }

    for (const column of filterableColumnFilters) {
      setSearchParam(column.id as any, (column.value as Array<any>).join('.'));
    }

    table.setPageIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(debouncedSearchableColumnFilters),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    JSON.stringify(filterableColumnFilters),
  ]);

  const table = useReactTable({
    ...props,
    pageCount,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  return table;
}
