import {
  ColumnDef, SortingState, flexRender, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';
import {
  ArrowDownAZ, ArrowUpAZ, MoveLeft, MoveRight,
} from 'lucide-react';
import { User } from '../../../app/types/types';

interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  data: User[]
}

export const Table = ({ data, className, ...props }: TableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<User>[]>(
    () => [

      {
        header: 'Name',
        accessorKey: 'name',
        footer: (props) => props.column.id,
      },
      {
        header: 'Job Title',
        accessorKey: 'jobTitle',
        footer: (props) => props.column.id,
      },
      {
        header: 'Tenure',
        accessorKey: 'tenure',
        accessorFn: (data: User) => Number(data.tenure),
        footer: (props) => props.column.id,

      },
      {
        header: 'Gender',
        accessorKey: 'gender',
        accessorFn: (data: User) => data?.gender![0],

        footer: (props) => props.column.id,
      },
    ],
    [],
  );
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugTable: true,
  });

  return (
    <>
      <table className={`w-full border-2 border-zinc-700 p-1 ${className}`} {...props}>
        <thead className="bg-zinc-500 ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <th key={header.id} colSpan={header.colSpan} className="cursor-pointer py-3">
                    {header.isPlaceholder ? null : (
                      // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                      <div
                        {...{
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                        className="flex p-2"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {{
                          asc: <ArrowDownAZ className="w-5 h-5 ml-2" />,
                          desc: <ArrowUpAZ className="w-5 h-5 ml-2" />,
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody className="max-h-[300px]">
          {table
            .getRowModel()
            .rows.map((row, idx) => {
              return (
                <tr className={`${idx % 2 === 0 ? 'bg-zinc-300' : 'bg-zinc-200'}  `} key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="p-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="flex gap-1 mt-2">
        <button
          type="button"
          className="flex gap-2 bg-zinc-900 text-zinc-100 p-2 rounded-lg disabled:bg-zinc-400"
          disabled={!table.getCanPreviousPage()}
          onClick={() => table.previousPage()}
        >
          <MoveLeft className="w-6 h-6" />
        </button>
        <button
          type="button"
          className="flex gap-2 bg-zinc-900 text-zinc-100 p-2 rounded-lg disabled:bg-zinc-400"
          disabled={!table.getCanNextPage()}
          onClick={() => table.nextPage()}
        >
          <MoveRight className="w-6 h-6" />
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1}
            {' '}
            of
            {' '}
            {table.getPageCount()}
          </strong>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[5, 10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show
              {' '}
              {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
