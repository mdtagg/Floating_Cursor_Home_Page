import './index.css'
import { Icon } from '@iconify/react';
import { navList } from './utils/getNavLinks';
import { useState,useEffect,useRef } from 'react'

export type TNavBar = {
    setModalToggle: React.Dispatch<React.SetStateAction<boolean>>
}

const NavBar = (props:TNavBar) => {

    const { setModalToggle } = props
    const [ navPosition, setNavPosition ] = useState(0)
    const navRef = useRef<HTMLElement | null>(null)
    const scrollRef = useRef(0)

    function handleNavScroll() {

        if(!navRef.current) return
        const scrollDiff = scrollRef.current - window.scrollY
        
        if(scrollDiff < -navRef.current.offsetHeight) {
           const test = window.scrollY - navRef.current.offsetHeight - scrollRef.current
           scrollRef.current += test
           setNavPosition(-150)
        }
        else if(scrollDiff > 0) {
            scrollRef.current = window.scrollY
            setNavPosition(0)
        }
        else {
            setNavPosition(() => scrollDiff)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll',handleNavScroll)
    },[])

    return (
        <nav
            ref={navRef}
            style={{
                "transform":`translateY(${navPosition}px)`
            }}
        >
            <p
                className="company-title"
            >
                COMPANY TITLE
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
                className="menu-button-container"
            >
                <button
                    className="nav-more-button"
                    onClick={() => setModalToggle(true)}
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