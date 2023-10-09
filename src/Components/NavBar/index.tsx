import './index.css'
import { Icon } from '@iconify/react';
import { navList } from './utils/getNavLinks';

const NavBar = () => {

    return (
        <nav>
            <p
                className="large center"
            >
                BASIC/DEPT
            </p>
            <ul
                className="nav-list center"
            >
                {navList.map(navLink => {
                    const [ name, id ] = navLink
                    return (
                        <li
                            key={id}
                        >
                            <a
                                className="nav-link"
                            >
                                {name}
                            </a>
                        </li>
                    )
                })}
            </ul>
            <div
                className="center"
            >
                <button
                    className="nav-more-button"
                >
                    <Icon 
                        icon="tabler:dots" 
                        color="white"
                        height="35"
                        width="35"
                    />
                </button>
            </div>
        </nav>
    )
}

export { NavBar }