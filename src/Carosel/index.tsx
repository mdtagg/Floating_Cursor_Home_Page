import "./index.css"
import { useState,useRef,useEffect,useCallback } from "react"
import Cursor from "./Cursor"
import { TCarouselContent } from "./CaroselContent"
// import CaroselContent from "./CaroselContent"

interface TCarousel {
    CaroselContent?: (props:TCarouselContent) => JSX.Element 
}

export type TCoords = {
    x:number,
    y:number,
    offset:number,
    transition:string
}

const Carousel = (props:TCarousel) => {

    const { CaroselContent } = props

    const [ isMouseDown, setIsMouseDown ] = useState(false)
    const [ isAnchorHover, setIsAnchorHover ] = useState(false)
    const [ isCarouselHover, setIsCarouselHover ] = useState(false)
    const [ scrollPosition, setScrollPosition ] = useState(0)

    const [ cursorCoords,setCursorCoords ] = useState({
        x:0,
        y:0,
        offset:0,
        transition:""
    })
    
    const cursorCoordsRef = useRef(cursorCoords) //used to pass cursor information to the scroll handler on window
    const cursorOuter = useRef<HTMLDivElement | null>(null) //used to grab offset from document
    const carouselContainer = useRef<HTMLDivElement | null>(null) //used to grab offset from container
    const carouselStage = useRef<HTMLUListElement | null>(null) //used to apply scroll position to progress bar element

    function handleMouseEnter(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setIsCarouselHover(true)
        handleMouseMove(e)
    }

    function handleMouseLeave() {
        setIsCarouselHover(false)
        const cursorPosition = {
            x:0,
            y:0,
            offset:window.scrollY,
            transition: "transform 1s"
        }
        setCursorCoords(cursorPosition)
        cursorCoordsRef.current! = cursorPosition
    }

    function handleMouseMove(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {      
        const totalPageOffset = carouselContainer.current!.offsetTop + cursorOuter.current!.offsetTop
        let { clientX,pageY } = e

        clientX -= window.innerWidth - 160 //adjusting the horizontal position by the cursor width
        pageY -= totalPageOffset + 80 //adjusting the vertical position by the total offset from the top of the carousel and half the cursor width
     
        const cursorPosition = {
            x:clientX,
            y:pageY,
            offset:window.scrollY,
            transition: isMouseDown ? "unset": "transform 0.1s"
        }
        setCursorCoords(cursorPosition)
        cursorCoordsRef.current! = cursorPosition

        if(isMouseDown) { 
            carouselStage.current!.scrollLeft = carouselStage.current!.scrollLeft - e.movementX //scrolls the carousel position horizonally with the mouse position
        }
    }

    const handleWindowScroll = useCallback(() => {
        const { x,y,offset } = cursorCoordsRef.current!
        const adjustedY = y - offset

        setCursorCoords({
            ...cursorCoords,
            x:x,
            y:adjustedY + window.scrollY
        })

    },[])

    useEffect(() => {
        if(isCarouselHover) {
            window.addEventListener("scroll",handleWindowScroll)
        }else {
            window.removeEventListener("scroll",handleWindowScroll)
        }
    },[isCarouselHover])

    return (
        <div 
            className="carousel-container"
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseDown={() => setIsMouseDown(true)}
            onMouseUp={() => setIsMouseDown(false)}
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={handleMouseLeave}
            ref={carouselContainer}
        >
            {CaroselContent &&
            <CaroselContent
                setIsAnchorHover={setIsAnchorHover}
                setScrollPosition={setScrollPosition}
                carouselStage={carouselStage}
            />
            }

            <div className="progress-bar-container">
                <span 
                    className="progress-bar-thumb" 
                    style={{"left":`${scrollPosition}%`}}
                ></span>
            </div>
           
            <Cursor
                cursorOuter={cursorOuter}
                isMouseDown={isMouseDown}
                isAnchorHover={isAnchorHover}
                cursorCoords={cursorCoords}
            />
        </div>
    )
}

export default Carousel