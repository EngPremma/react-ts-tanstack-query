import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import qs from 'qs';

const useUrlCallback = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const queryString = useMemo(() => qs.parse(search.replace('?', '')) as { callback: string }, [search]);

  const urlCallback = useMemo(() => encodeURIComponent(`${pathname}${search}`), [pathname, search]);

  const navigateToLoginWithUrlCallback = () => {
    const urlCallback = encodeURIComponent(`${pathname}${search}`);

    navigate(`/login?callback=${urlCallback}`, { replace: true });
  };

  const navigateToCallbackUrl = () => {
    navigate(`${decodeURIComponent(queryString.callback)}`, { replace: true });
  };

  return {
    queryString,
    urlCallback,
    navigateToLoginWithUrlCallback,
    navigateToCallbackUrl,
  };
};

export default useUrlCallback;
