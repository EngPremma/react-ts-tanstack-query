import { Outlet } from 'react-router';

import NavBar from 'src/components/nav-bar';

const HomeLayout = () => {
  return (
    <>
      <NavBar />
      <main className='container font-[Montserrat]'>
        <Outlet />
      </main>
    </>
  );
};

export default HomeLayout;
