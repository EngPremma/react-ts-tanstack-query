import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

import { routePath } from 'src/router/route-path';

const navList = [
  { routePath: routePath.homePage, label: 'Home' },
  { routePath: routePath.catsInfiniteQueryPage, label: 'Cats infinite query' },
  { routePath: routePath.catsUseQueryPage, label: 'Cats use query' },
];

const HomeLayout = ({ children }: { children: ReactNode }) => {
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
              <li style={{ listStyle: 'none' }}>
                <NavLink to={nav.routePath}>{nav.label} </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <main style={{ margin: '8px 100px 0 100px' }}>{children}</main>
    </div>
  );
};

export default HomeLayout;
