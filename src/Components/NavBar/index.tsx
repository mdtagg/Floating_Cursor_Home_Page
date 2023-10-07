import './index.css'
import { Icon } from '@iconify/react';

const NavBar = () => {

    const navList = ['WORK','ABOUT','NEWS','THINKING','CAREERS','CONTACT']

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
                    return (
                        <li
                            className="nav-item"
                        >
                            <a
                                className="nav-link"
                            >
                                {navLink}
                            </a>
                            <div
                                className="underline"
                            >
                                
                            </div>
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