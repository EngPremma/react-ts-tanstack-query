import { Outlet } from 'react-router';

import NavBar from 'src/components/nav-bar';

const HomeLayout = () => {
  return (
    <>
      <NavBar />
      <main style={{ margin: '8px 100px 0 100px' }}>
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
