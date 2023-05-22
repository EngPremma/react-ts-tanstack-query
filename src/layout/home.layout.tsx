import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

const HomeLayout = ({ children }: { children: ReactNode }) => {
	return (
		<div>
			<nav style={{ padding: 10, background: 'aqua' }}>
				<ul
					style={{
						display: 'flex',
						justifyContent: 'space-evenly',
					}}
				>
					<li style={{ listStyle: 'none' }}>
						<NavLink to='/'>Home</NavLink>
					</li>
					<li style={{ listStyle: 'none' }}>
						<NavLink to='/cats'>Cats</NavLink>
					</li>
				</ul>
			</nav>
			<main style={{ margin: '8px 100px 0 100px' }}>{children}</main>
		</div>
	);
};

export default HomeLayout;
