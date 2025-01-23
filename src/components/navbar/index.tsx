import { NavLink, useNavigate } from 'react-router';

import { routePath } from 'src/router/route-path';
import { authApi } from 'src/api/auth';

const navList = [
  { routePath: routePath.homePage, label: 'Home' },
  { routePath: routePath.catsInfiniteQueryPage, label: 'Cats infinite query' },
  { routePath: routePath.catsUseQueryPage, label: 'Cats use query' },
  { routePath: routePath.createCatPage, label: 'Create cat' },
  { routePath: routePath.testPage, label: 'Test Page' },
  { routePath: routePath.tanStackTablePage, label: 'Tan stack table' },
];

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authApi.logout();
      navigate('/login');
    } catch (error) {
      console.log('error :>> ', error);
    }
  };
  return (
    <nav style={{ padding: 10, background: 'grey' }}>
      <ul
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}
      >
        {navList.map(nav => {
          return (
            <li key={nav.routePath} style={{ listStyle: 'none' }}>
              <NavLink to={nav.routePath}>{nav.label} </NavLink>
            </li>
          );
        })}
        <li>
          <button onClick={handleLogout}>logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
