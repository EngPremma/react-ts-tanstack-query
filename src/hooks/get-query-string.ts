import { useMemo } from 'react';
import { useLocation } from 'react-router';
import qs from 'qs';

const useGetQueryStringObject = <T>(): T => {
  const { search } = useLocation();

  const query = useMemo(() => (qs.parse(search.replace('?', '')) as T) || ({} as T), [search]);

  return query;
};

export default useGetQueryStringObject;
