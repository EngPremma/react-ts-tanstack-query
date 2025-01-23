import { useQuery } from '@tanstack/react-query';

import { authApi } from 'src/api/auth';
import { queryKeys } from '../constants';

const useGetMe = () => {
  const result = useQuery({
    queryKey: queryKeys.getMe(),
    queryFn: authApi.getMe,
  });

  return result;
};

export default useGetMe;
