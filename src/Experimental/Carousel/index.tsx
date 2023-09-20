import "./index.css"
import { useState } from "react"
import { CompanyContent } from "../CompanyContent"

export type CarouselProps = {
    setCursorEvent?:React.Dispatch<React.SetStateAction<React.MouseEvent<HTMLDivElement, MouseEvent> | null>>
}

const Carousel = (props:CarouselProps) => {

    const { setCursorEvent } = props
    const [ scrollPosition, setScrollPosition ] = useState(0)

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
                draggable={false}
                onMouseMove={(e) => handleEvent(e)}
                onMouseLeave={(e) => handleEvent(e)}
            >
                <CompanyContent
                    setScrollPosition={setScrollPosition}
                />
            </div>
            <div className="progress-bar-container">
                <div 
                    className="progress-bar-track"
                >
                    <span 
                        className="progress-bar-slider" 
                        style={{
                            "left":`${scrollPosition}%`
                        }}
                    ></span>
                </div>
            </div>
        </div>
    )
}

export { Carousel }

// cursorEvent:React.MouseEvent<HTMLDivElement, MouseEvent> | null
    // const [ cursorEvent,setCursorEvent ] = useState<null | React.MouseEvent<HTMLDivElement, MouseEvent>>(null)
