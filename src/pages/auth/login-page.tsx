import { useNavigate, Link } from 'react-router';

import { authApi } from 'src/api/auth';
import useUrlCallback from 'src/hooks/use-url-callback';

const LoginPage = () => {
  const navigate = useNavigate();
  const { navigateToCallbackUrl, callbackUrl } = useUrlCallback();

  const handleLogin = async () => {
    try {
      await authApi.login({ email: 'premma@test.com', password: '12345678' });

      if (callbackUrl) {
        navigateToCallbackUrl();
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
