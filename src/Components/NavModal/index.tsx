import './index.css'
import { TNavBar } from '../NavBar';

const NavModal = (props:TNavBar) => {

    const { setModalToggle } = props

    return (
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
    )
}

export { NavModal }