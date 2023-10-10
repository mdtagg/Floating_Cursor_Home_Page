import "./index.css"
import { useState,useEffect,useRef } from "react"
import { CompanyContent } from "../CompanyContent"
import { TProgressBar } from "../ProgressBar"

type TCarousel = {
    ProgressBar?:(props:TProgressBar) => JSX.Element
}

const Carousel = (props:TCarousel) => {

    const { ProgressBar } = props
    const [ scrollPosition, setScrollPosition ] = useState(0)
    const [ scrollWidth, setScrollWidth ] = useState(0)

    const [ mouseDown, setMouseDown ] = useState(false)
    const stageRef = useRef<HTMLDivElement | null>(null)


    function handleScroll(e:React.UIEvent<HTMLElement, UIEvent>) {
        const target = e.target as HTMLDivElement
        const overflowScroll = target.scrollWidth - target.clientWidth // Amount of overflow scroll
        const scrollPosition = ((overflowScroll - target.scrollLeft) / overflowScroll) * 100 //the percentage from 100 of scroll 
        const adjusted = (100 - scrollPosition) * ((100 - scrollWidth) * 0.01) // The percentage of scroll to adjust right including scrollBar width
        setScrollPosition(adjusted)
    }

    function handleMouseMove(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if(!mouseDown) return;
        stageRef.current!.scrollLeft -= e.movementX  //scrolls the carousel position horizontally with the mouse position
    }

    useEffect(() => {
        setScrollWidth((window.innerWidth / stageRef.current!.scrollWidth) * 100)
    },[])

    return (
        <div 
            id="carousel-container"
            draggable={false}
        >
            <div 
                onScroll={(e) => handleScroll(e)}
                onMouseMove={(e) => handleMouseMove(e)}
                onMouseDown={() => setMouseDown(true)}
                onMouseUp={() => setMouseDown(false)}
                className="carousel-stage"
                draggable={false}
                ref={stageRef}
            >
                <CompanyContent/>
            </div>
            {ProgressBar && 
            <ProgressBar
                scrollWidth={scrollWidth}
                scrollPosition={scrollPosition}
            />}
        </div>
    )
}

export { Carousel }
