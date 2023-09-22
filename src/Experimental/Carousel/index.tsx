import "./index.css"
import { useState } from "react"
import { CompanyContent } from "../CompanyContent"

const Carousel = () => {

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
