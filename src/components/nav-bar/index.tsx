import { NavLink } from 'react-router';

import { routePath } from 'src/router/route-path';

const navList = [
  { routePath: routePath.homePage, label: 'Home' },
  { routePath: routePath.catsInfiniteQueryPage, label: 'Cats infinite query' },
  { routePath: routePath.catsUseQueryPage, label: 'Cats use query' },
  { routePath: routePath.createCatPage, label: 'Create cat' },
  { routePath: routePath.testPage, label: 'Test Page' },
  { routePath: routePath.tanStackTablePage, label: 'Tan stack table' },
];

const NavBar = () => {
  return (
    <nav className='p-5 bg-gray-300'>
      <ul className='flex justify-evenly'>
        {navList.map(nav => {
          return (
            <li key={nav.routePath}>
              <NavLink
                className={({ isActive }: { isActive: boolean }) =>
                  `${isActive ? 'text-blue-700 ' : ''} font-[Montserrat] font-semibold`
                }
                to={nav.routePath}
              >
                {nav.label}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
