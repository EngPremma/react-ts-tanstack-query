import { useNavigate, Link, useLocation } from 'react-router';
import qs from 'qs';

import { authApi } from 'src/api/auth';

const LoginPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryString = qs.parse(search.replace('?', ''));

  const handleLogin = async () => {
    try {
      await authApi.login({ email: 'premma@test.com', password: '12345678' });

      if (queryString.callback) {
        navigate(`${decodeURIComponent(queryString.callback as string)}`, { replace: true });
      } else {
        navigate('/dashboard', { replace: true });
      }
    } catch (error) {
      console.log('error :>> ', error);
    }
  };

  return (
    <div>
      LoginPage
      <button onClick={handleLogin}>Login</button>
      <Link to='/dashboard'>dashboard</Link>
    </div>
  );
};

export default LoginPage;
