import { ReactNode } from 'react';
import { NavLink, useNavigate } from 'react-router';

import { routePath } from 'src/router/route-path';
import { useAuthContext } from 'src/contexts';
import { clearAuthToken } from 'src/utils/auth-token';

const navList = [
  { routePath: routePath.homePage, label: 'Home' },
  { routePath: routePath.catsInfiniteQueryPage, label: 'Cats infinite query' },
  { routePath: routePath.catsUseQueryPage, label: 'Cats use query' },
  { routePath: routePath.createCatPage, label: 'Create cat' },
  { routePath: routePath.testPage, label: 'Test Page' },
  { routePath: routePath.tanStackTablePage, label: 'Tan stack table' },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const { user, getMe } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthToken();
    navigate('/login');
  };

  return (
    <div>
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
      <main style={{ margin: '8px 100px 0 100px' }}>
        <button onClick={getMe}>get me</button>
        <h1>
          Welcome <span>{user?.name}</span>
        </h1>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
