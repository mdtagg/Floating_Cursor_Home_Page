import "./index.css"
import { useState,useRef,useEffect,useCallback } from "react"
import { getCompanyData } from "./utils/companies"
import Cursor from "./Cursor"

type TCoords = {
    x:number,
    y:number,
    offset:number
}

const Carousel = () => {

    const Companies = getCompanyData()
    const [ isMouseDown, setIsMouseDown ] = useState(false)
    const [ isAnchorHover, setIsAnchorHover ] = useState(false)
    const [ isCarouselHover, setIsCarouselHover ] = useState(false)

    const [ cursorCoords,setCursorCoords ] = useState({
        x:0,
        y:0,
        offset:0
    })
    
    const cursorCoordsRef = useRef(cursorCoords)
    const setCoordState = (coords:TCoords) => {
        cursorCoordsRef.current = coords
        setCursorCoords(coords)
    } 

    const scrollBar = useRef<HTMLUListElement | null>(null)
    const cursorContainer = useRef<HTMLDivElement | null>(null)
    const cursorOuter = useRef<HTMLDivElement | null>(null)
    const carouselContainer = useRef<HTMLDivElement | null>(null)
    const carouselStage = useRef<HTMLUListElement | null>(null)

    function handleScroll(e:React.UIEvent<HTMLUListElement, UIEvent>) {
        
        const target = e.target as HTMLUListElement
        const maxScroll = target.scrollWidth - target.clientWidth // Amount of overflow scroll
        const scrollPosition = ((maxScroll - target.scrollLeft) / maxScroll) * 100 //the percentage from 100 of scroll space left
        const adjusted = (100 - scrollPosition) * .4 // The percentage of scroll to adjust right including scrollBar width
        scrollBar.current!.style.left = `${adjusted}%`
    }

    function handleMouseEnter(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setIsCarouselHover(true)
        handleMouseMove(e)
    }

    function handleMouseLeave() {
        setIsCarouselHover(false)
        const cursorStyle = cursorOuter.current!.style
        cursorStyle.transform = `translate(0)`
        cursorStyle.transition = `transform 1s`
    }

    function handleMouseMove(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {      
        const totalPageOffset = carouselContainer.current!.offsetTop + cursorOuter.current!.offsetTop
        let { clientX,pageY } = e
        pageY -= totalPageOffset + 80 //adjusting the vertical position by the total offset from the top of the carousel and half the cursor width
        clientX -= window.innerWidth - 160 //adjusting the horizontal position by half the cursor width
        
        setCoordState({
            x:clientX,
            y:pageY,
            offset:window.scrollY
        })

        if(isMouseDown) { 
            //scrolls the carousel position horizonally with the mouse position
            carouselStage.current!.scrollLeft = carouselStage.current!.scrollLeft - e.movementX
        }

        cursorOuter.current!.style.transform = `translate(${clientX}px,${pageY}px)`
        cursorOuter.current!.style.transition = isMouseDown ? "unset": "transform 0.1s"
    }

    const handleWindowScroll = useCallback(() => {
        const { x,y,offset } = cursorCoordsRef.current!
        const adjustedY = y - offset
        cursorOuter.current!.style.transform = `translate(${x}px,${adjustedY + window.scrollY}px)`
        cursorOuter.current!.style.transition = "transform unset"
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
            id="carousel-container"
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseDown={() => setIsMouseDown(true)}
            onMouseUp={() => setIsMouseDown(false)}
            onMouseEnter={(e) => handleMouseEnter(e)}
            onMouseLeave={handleMouseLeave}
            ref={carouselContainer}
        >
            <ul 
                id="carousel-stage"
                onScroll={(e) => handleScroll(e)}
                ref={carouselStage}
                draggable={false}
            >
            {Companies.map(company => {

                return (
                    <div className="carousel-panel">
                        <p className="company-logo">{company.title}</p>
                        <p>_</p>
                        <div className="company-information">
                            <p>{company.title}</p>
                            <p 
                                className="carousel-content"
                            >
                                {company.content}
                                {company.anchor && 
                                    <a 
                                        className="company-anchor" 
                                        href={company.anchor}
                                        onMouseEnter={() => setIsAnchorHover(true)}
                                        onMouseLeave={() => setIsAnchorHover(false)}
                                    >
                                        here
                                    </a>
                                }
                            </p>
                        </div>
                    </div>
                )
            })}
            </ul>

            <div className="progress-bar-container">
                <span 
                    ref={scrollBar} 
                    className="progress-bar-thumb" 
                ></span>
            </div>
           
            <Cursor
                cursorContainer={cursorContainer}
                cursorOuter={cursorOuter}
                isMouseDown={isMouseDown}
                isAnchorHover={isAnchorHover}
            />
        </div>
    )
}

export default Carousel