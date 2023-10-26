import './index.css'
import { TNavBar } from '../NavBar';
import { CursorTakeover } from '../CursorTakeover';
import { CustomCursor } from '../CustomCursor';
import { Carousel } from '../Carousel';
import { Projects } from '../Projects';
import { useState,useEffect } from 'react'

const NavModal = (props:TNavBar) => {

    const { setModalToggle } = props

    const [ overlay, setOverlay ] = useState({
        overlayPosition:"",
        overlayOpacity:""
    })

    useEffect(() => {
        setOverlay({
            overlayPosition:"right",
            overlayOpacity:"opacity-1"
        })
    },[])

    return (
        <section
            className={`nav-modal ${overlay.overlayOpacity}`}
        >
            <div 
                className={`invisible-container ${overlay.overlayPosition}`}
            >
            </div>
            <header>
                <div
                    className="modal-info"
                >
                    <span>
                        ●
                    </span>

                    <span>
                        (5) INTERNAL WORKS
                        <br/>
                        &copy;23 c/o COMPANY&reg;
                    </span>

                    <span>
                        A COLLECTION OF INTERNAL PROJECTS AND INITIATIVES
                    </span>
                </div>

                <button
                    onClick={() => setModalToggle(false)}
                >
                    X
                </button>
                
            </header>
            <CursorTakeover
                    CustomCursor={CustomCursor}
                    color={"pink"}
                    position="right"
                    text="DRAG"
                >
                <Carousel>

                    <Projects/>

                </Carousel>
                
            </CursorTakeover>
        </section>
    )
}

export { NavModal }