import { useMemo } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { userApi, User } from 'src/api';
import Table from 'src/components/table';
import useGetUsersQueryParams from './hooks/use-get-users-query-params';

const TanStackTablePage = () => {
  const query = useGetUsersQueryParams();

  const { data } = useQuery({
    queryKey: ['users', query.page, query.limit],
    queryFn: () => userApi.users({ page: query.page, limit: query.limit }),
    placeholderData: keepPreviousData,
    staleTime: 10_000,
  });

  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Username',
        cell: info => info.renderValue(),
      },
      {
        accessorKey: 'email',
        header: 'Email',
        cell: info => info.renderValue(),
      },
      {
        accessorKey: 'createdAt',
        header: 'Created at',
        cell: info => info.renderValue(),
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: props => (
          <button
            onClick={() => {
              console.log(props.cell.row.original._id);
            }}
          >
            action
          </button>
        ),
      },
    ],
    [],
  );

  return (
    <>
      <Table
        data={data?.docs || []}
        columns={columns}
        paginationOptions={{
          pageCount: data?.totalPages,
        }}
        showRowsOptions={[2, 4, 10]}
      />
    </>
  );
};

export default TanStackTablePage;
