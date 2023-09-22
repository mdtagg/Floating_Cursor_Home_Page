import "./index.css"
import { useState } from "react"
import { CompanyContent } from "../CompanyContent"

export type CarouselProps = {
    setIsAnchorHover?:React.Dispatch<React.SetStateAction<boolean>>
    isMouseDown:boolean
}

const Carousel = (props:CarouselProps) => {

    const { setIsAnchorHover,isMouseDown } = props
    const [ scrollPosition, setScrollPosition ] = useState(0)
    const [ scrollWidth, setScrollWidth ] = useState(0)

    return (
        <div 
            id="carousel-container"
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
                    isMouseDown={isMouseDown}
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
