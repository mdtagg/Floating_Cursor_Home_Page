import "./index.css"
import { useState } from "react"
import { FloatingCursor } from "../FloatingCursor"
import { CompanyContent } from "../CompanyContent"

const Carousel = () => {

    const [ cursorEvent,setCursorEvent ] = useState<null | React.MouseEvent<HTMLDivElement, MouseEvent>>(null)
    const [ scrollPosition, setScrollPosition ] = useState(0)
    

    function handleScroll(e:React.UIEvent<HTMLElement, UIEvent>) {
        const target = e.target as HTMLUListElement
        const maxScroll = target.scrollWidth - target.clientWidth // Amount of overflow scroll
        const scrollPosition = ((maxScroll - target.scrollLeft) / maxScroll) * 100 //the percentage from 100 of scroll 
        const adjusted = (100 - scrollPosition) * .4 // The percentage of scroll to adjust right including scrollBar width
        setScrollPosition(adjusted)
    }
        return (
        <div 
            id="carousel-stage"
            onScroll={(e) => handleScroll(e)}
            draggable={false}
            onMouseMove={(e) => setCursorEvent(e)}
            onMouseLeave={(e) => setCursorEvent(e)}
        >
            <CompanyContent
                cursorEvent={cursorEvent}
            />

            {/* <div className="progress-bar-container">
                <span 
                    className="progress-bar-thumb" 
                    style={{"left":`${scrollPosition}%`}}
                ></span>
            </div> */}
            {/* <FloatingCursor
                cursorEvent={cursorEvent}
            /> */}
        </div>
    )
}

export { Carousel }