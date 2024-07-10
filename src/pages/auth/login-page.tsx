import { useNavigate, Link } from 'react-router-dom';

import { authApi } from 'src/api/auth';
import { setAuthToken } from 'src/utils/auth-token';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await authApi.login({ email: 'premma@test.com', password: '12345678' });
      setAuthToken(response.token);
      navigate('/dashboard', { replace: true });
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
