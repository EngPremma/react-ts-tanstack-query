import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import qs from 'qs';

import { UsersQueryParams } from 'src/api';

const useGetUsersQueryParams = () => {
  const { search } = useLocation();

  const usersQueryParams = useMemo<UsersQueryParams>(() => {
    const query = qs.parse(search.replace('?', ''));

    return {
      page: Number(query?.page) + 1 || 1,
      limit: Number(query?.limit) || 10,
    };
  }, [search]);

  return usersQueryParams;
};

export default useGetUsersQueryParams;
