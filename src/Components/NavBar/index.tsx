import './index.css'
import { Icon } from '@iconify/react';
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

const NavBar = () => {

    const navList = ['WORK','ABOUT','NEWS','THINKING','CAREERS','CONTACT']
    const [ navItemId, setNavItemId ] = useState<number | null>(null)

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
                {navList.map((navLink,index) => {
                    const underlineAnimation = 
                    index === navItemId ? 
                    "underline-animation-forwards" : 
                    ""
                    
                    return (
                        <li
                            className="nav-item"
                            onMouseEnter={() => {
                                setNavItemId(index)
                            }}
                            onMouseLeave={() => {
                              
                            }}
                            key={uuidv4()}
                        >
                            <a
                                className="nav-link"
                                data-position={index}
                            >
                                {navLink}
                            </a>
                            <div
                                className={`underline  ${underlineAnimation}`}
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