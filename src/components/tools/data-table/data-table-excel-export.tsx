'use client';

import { useMemo } from 'react';
import { ArrowRightFromLine } from 'lucide-react';
import type { Table } from '@tanstack/react-table';

import { cn } from '@/utils/cn.util';
import { Button } from '@/components/ui/button';

import { LucideIcon } from '../lucide-icon';
import { CustomTooltip } from '../custom-tooltip';

interface DataTableExcelExportProps<T> {
  table: Table<T>;
  className?: string;
}

export function DataTableExcelExport<T>({
  table,
  className,
}: DataTableExcelExportProps<T>) {
  const rows = useMemo(() => table.getFilteredRowModel().rows, [table]);

  if (!rows.length) return null;

  async function exportToExcel() {
    const { exportTableToCSV } = await import(
      '../../../utils/export-table-to-csv.util'
    );

    exportTableToCSV(table, {
      filename: 'financas',
      excludeColumns: ['select', 'actions'],
      onlySelected: true,
    });
  }

  return (
    <CustomTooltip tooltipText="Exportar Para Excel">
      <Button
        className={cn('inline-flex items-center gap-2 w-full', className)}
        variant="outline"
        onClick={exportToExcel}
      >
        <LucideIcon icon={ArrowRightFromLine} size="sm" />
        Exportar
      </Button>
    </CustomTooltip>
  );
}
