import type { Table } from '@tanstack/react-table';

export function exportTableToCSV<TData>(
  table: Table<TData>,
  {
    filename = 'table',
    excludeColumns = [],
  }: {
    filename?: string;
    excludeColumns?: (keyof TData | 'select' | 'actions')[];
  } = {}
): void {
  const headers = table
    .getAllLeafColumns()
    .map((column) => column.id)
    .filter((id) => !excludeColumns.includes(id as any));

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  const rows = (
    selectedRows.length ? selectedRows : table.getRowModel().rows
  ).map((row) =>
    headers
      .map((header) => {
        const cellValue = row.getValue(header);

        return typeof cellValue === 'string'
          ? `"${cellValue.replace(/"/g, '""')}"`
          : cellValue;
      })
      .join(',')
  );

  const csvContent = [headers.join(','), ...rows].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `${filename}.csv`;
  link.style.visibility = 'hidden';

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}
