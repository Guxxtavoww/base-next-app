'use client';

import { useMemo } from 'react';
import { ArrowRightFromLine } from 'lucide-react';
import type { Table } from '@tanstack/react-table';

import { cn } from '@/utils/cn.util';
import { Button } from '@/components/ui/button';

import type { ExportType } from './utils';
import { lucide-reactIcon } from '../lucide-react-icon';
import { CustomTooltip } from '../custom-tooltip';

interface DataTableExcelExportProps<T> {
  table: Table<T>;
  className?: string;
  export_type?: ExportType;
}

export function DataTableExcelExport<T>({
  table,
  className,
  export_type,
}: DataTableExcelExportProps<T>) {
  const rows = useMemo(() => table.getFilteredRowModel().rows, [table]);

  if (!rows.length) return null;

  async function exportToExcel() {
    const { exportTableToCSV } = await import('./utils');

    exportTableToCSV(table, {
      filename: 'financas',
      excludeColumns: ['select', 'actions'],
      export_type,
    });
  }

  return (
    <CustomTooltip tooltipText="Exportar Para Excel">
      <Button
        className={cn('inline-flex items-center gap-2 w-full', className)}
        variant="outline"
        onClick={exportToExcel}
      >
        <lucide-reactIcon icon={ArrowRightFromLine} size="sm" />
        Exportar
      </Button>
    </CustomTooltip>
  );
}
