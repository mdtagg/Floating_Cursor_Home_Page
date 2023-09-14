import "./index.css"
import { useState,useRef,useEffect,useCallback } from "react"
import { getCompanyData } from "./utils/companies"
import Cursor from "./Cursor"
import Panel from "./Panel"

export type TCoords = {
    x:number,
    y:number,
    offset:number,
    transition:string
}

const Carousel = () => {

    const Companies = getCompanyData()
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

    function handleScroll(e:React.UIEvent<HTMLUListElement, UIEvent>) {
        const target = e.target as HTMLUListElement
        const maxScroll = target.scrollWidth - target.clientWidth // Amount of overflow scroll
        const scrollPosition = ((maxScroll - target.scrollLeft) / maxScroll) * 100 //the percentage from 100 of scroll space left
        const adjusted = (100 - scrollPosition) * .4 // The percentage of scroll to adjust right including scrollBar width
        setScrollPosition(adjusted)
    }

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
                    <Panel
                        company={company}
                        setIsAnchorHover={setIsAnchorHover}
                    />
                    // <div className="carousel-panel">
                    //     <p className="company-logo">{company.title}</p>
                    //     <p>_</p>
                    //     <div className="company-information">
                    //         <p>{company.title}</p>
                    //         <p 
                    //             className="carousel-content"
                    //         >
                    //             {company.content}
                    //             {company.anchor && 
                    //                 <a 
                    //                     className="company-anchor" 
                    //                     href={company.anchor}
                    //                     onMouseEnter={() => setIsAnchorHover(true)}
                    //                     onMouseLeave={() => setIsAnchorHover(false)}
                    //                 >
                    //                     here
                    //                 </a>
                    //             }
                    //         </p>
                    //     </div>
                    // </div>
                )
            })}
            </ul>

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