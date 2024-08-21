import { useState, useEffect } from 'react';
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  PaginationState,
  // SortingState,
} from '@tanstack/react-table';
import { useSearchParams } from 'react-router-dom';

import useGetQueryStringObject from 'src/hooks/get-query-string';

type Props<T extends Record<string, string | number>> = {
  data: T[];
  columns: ColumnDef<T>[];
  pageCount?: number;
  showRowsOptions?: number[];
};

const Table = <T extends Record<string, string | number>>({
  data,
  columns,
  pageCount,
  showRowsOptions = [10, 20, 30],
}: Props<T>) => {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });
  // const [sorting, setSorting] = useState<SortingState>([]);
  const [, setSearchParams] = useSearchParams();

  const query = useGetQueryStringObject<{ page?: string; limit?: string }>();

  useEffect(() => {
    const { page: newPage, limit: newLimit } = query;
    if (Number(newPage) !== pagination.pageIndex)
      setPagination(prev => ({ ...prev, pageIndex: Number(newPage) || 0 }));

    if (Number(newLimit) !== pagination.pageSize)
      setPagination(prev => ({ ...prev, pageSize: Number(newLimit) || 10 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, //we're doing manual "server-side" pagination
    // manualSorting: true,
    debugTable: true,
    state: {
      pagination,
      // sorting,
    },
    onPaginationChange: setPagination,
    // onSortingChange: setSorting,
    pageCount,
  });

  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                return (
                  <th
                    key={header.id}
                    // onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {/* {{
                      asc: ' 🔼',
                      desc: ' 🔽',
                    }[header.column.getIsSorted() as string] ?? null} */}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} onClick={row.getToggleSelectedHandler()}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <button
          onClick={() => {
            table.previousPage();
            setSearchParams(params => {
              params.set('page', String((pagination.pageIndex -= 1)));
              return params;
            });
          }}
          disabled={!table.getCanPreviousPage()}
        >
          prev
        </button>
        <button
          onClick={() => {
            table.nextPage();
            setSearchParams(params => {
              params.set('page', String((pagination.pageIndex += 1)));
              return params;
            });
          }}
          disabled={!table.getCanNextPage()}
        >
          next
        </button>
        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value));
            table.resetPageIndex();
            setSearchParams(params => {
              params.set('limit', e.target.value);
              params.set('page', '0');
              return params;
            });
          }}
        >
          {showRowsOptions.map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>
        <p>page: {pagination.pageIndex + 1}</p>
        <p>page index: {pagination.pageIndex}</p>
        <p>page size: {pagination.pageSize}</p>
      </div>
    </>
  );
};

export default Table;
