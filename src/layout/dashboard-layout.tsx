import { Outlet } from 'react-router';

import { useAuthContext } from 'src/contexts';
import Navbar from 'src/components/navbar';

const DashboardLayout = () => {
  const { user, getMe } = useAuthContext();

  return (
    <div>
      <Navbar />
      <main style={{ margin: '8px 100px 0 100px' }}>
        <button onClick={getMe}>get me</button>
        <h1>
          Welcome <span>{user?.name}</span>
        </h1>
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
