import './index.css'
import { TNavBar } from '../NavBar';
import { CursorTakeover } from '../CursorTakeover';
import { CustomCursor } from '../CustomCursor';
import { Carousel } from '../Carousel';

const NavModal = (props:TNavBar) => {

    const { setModalToggle } = props

    return (
        <section
            className="nav-modal"
        >
            <header
                className="modal-header"
            >
                <div
                    className="modal-info"
                >
                    <p 
                        className="modal-dot"
                    >
                        ●
                    </p>
                    <span>(5) INTERNAL WORKS<br/>&copy;23 c/o COMPANY&reg;</span>
                    <span>A COLLECTION OF INTERNAL PROJECTS AND INITIATIVES</span>
                </div>

                <div
                    className="modal-exit-container"
                >
                    <button
                        className="modal-exit"
                        onClick={() => setModalToggle(false)}
                    >
                        X
                    </button>
                </div>
                
            </header>
            <CursorTakeover
                    CustomCursor={CustomCursor}
                    color={"pink"}
                    position="right"
                    text="DRAG"
                >
                <Carousel/>
            </CursorTakeover>
        </section>
    )
}

export { NavModal }