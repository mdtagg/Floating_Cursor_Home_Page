import "./index.css"
import { useState } from "react"
import { CompanyContent } from "../CompanyContent"
import { handleEvent } from "../../utils/handleEvent"

export type CarouselProps = {
    setCursorEvent?:React.Dispatch<React.SetStateAction<React.MouseEvent<HTMLDivElement, MouseEvent> | null>>
    setIsAnchorHover?:React.Dispatch<React.SetStateAction<boolean>>
}

const Carousel = (props:CarouselProps) => {

    const { setCursorEvent,setIsAnchorHover } = props
    const [ scrollPosition, setScrollPosition ] = useState(0)
    const [ scrollWidth, setScrollWidth ] = useState(0)

    return (
        <div 
            id="carousel-container"
            onMouseMove={(e) => handleEvent(e,setCursorEvent!)}
            onMouseLeave={(e) => handleEvent(e,setCursorEvent!)}
            onMouseDown={(e) => handleEvent(e,setCursorEvent!)}
            onMouseUp={(e) => handleEvent(e,setCursorEvent!)}
        >
            <div 
                id="carousel-stage"
                draggable={false}
            >
                <CompanyContent
                    scrollWidth={scrollWidth}
                    setScrollWidth={setScrollWidth}
                    setScrollPosition={setScrollPosition}
                    setIsAnchorHover={setIsAnchorHover!}
                />
            </div>
            <div className="progress-bar-container">
                <div 
                    className="progress-bar-track"
                >
                    <span 
                        className="progress-bar-slider" 
                        style={{
                            "width":`${scrollWidth}%`,
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
    
    // function handleEvent(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
    //     if(setCursorEvent) {
    //         setCursorEvent(e)
    //     }
    // }
