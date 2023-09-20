import "./index.css"
import { useState } from "react"
import { CompanyContent } from "../CompanyContent"

export type CarouselProps = {
    setCursorEvent?:React.Dispatch<React.SetStateAction<React.MouseEvent<HTMLDivElement, MouseEvent> | null>>
}

const Carousel = (props:CarouselProps) => {

    const { setCursorEvent } = props
    const [ scrollPosition, setScrollPosition ] = useState(0)

    function handleScroll(e:React.UIEvent<HTMLElement, UIEvent>) {
        const target = e.target as HTMLUListElement
        const maxScroll = target.scrollWidth - target.clientWidth // Amount of overflow scroll
        const scrollPosition = ((maxScroll - target.scrollLeft) / maxScroll) * 100 //the percentage from 100 of scroll 
        const adjusted = (100 - scrollPosition) * .4 // The percentage of scroll to adjust right including scrollBar width
        setScrollPosition(adjusted)
    }

    function handleEvent(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if(setCursorEvent) {
            setCursorEvent(e)
        }
    }

    return (
        <div 
            id="carousel-container"
        >
            <div 
                id="carousel-stage"
                onScroll={(e) => handleScroll(e)}
                draggable={false}
                onMouseMove={(e) => handleEvent(e)}
                onMouseLeave={(e) => handleEvent(e)}
            >
                <CompanyContent/>
            </div>

            <div 
                className="progress-bar-container"
            >
                <span 
                    className="progress-bar-thumb" 
                    style={{"left":`${scrollPosition}%`}}
                ></span>
            </div>
        </div>
    )
}

export { Carousel }

// cursorEvent:React.MouseEvent<HTMLDivElement, MouseEvent> | null
    // const [ cursorEvent,setCursorEvent ] = useState<null | React.MouseEvent<HTMLDivElement, MouseEvent>>(null)
