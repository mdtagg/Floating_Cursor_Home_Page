import "./index.css"
import { useState,useRef } from "react"
import { getCompanyData } from "./utils/companies"
import Cursor from "./Cursor"

const Carosel = () => {

    const Companies = getCompanyData()
    const [ isMouseDown, setIsMouseDown ] = useState(false)
    const [ isMouseOut,setIsMouseOut ] = useState(true)
    const bar = useRef<HTMLUListElement | null>(null)
    const cursorContainer = useRef<HTMLDivElement | null>(null)
    const cursorOuter = useRef<HTMLDivElement | null>(null)
    const caroselContainer = useRef<HTMLDivElement | null>(null)
    const caroselStage = useRef<HTMLUListElement | null>(null)


    function handleScroll(e:React.UIEvent<HTMLUListElement, UIEvent>) {
        const target = e.target as HTMLUListElement
        const maxScroll = target.scrollWidth - target.clientWidth // Amount of overflow scroll
        const scrollPosition = ((maxScroll - target.scrollLeft) / maxScroll) * 100 //the percentage from 100 of scroll space left
        const adjusted = (100 - scrollPosition) * .4 // The percentage of scroll to adjust right including bar width
        bar.current!.style.left = `${adjusted}%`
    }

    function handleMouseOut() {
        let cursorStyle = cursorOuter.current!.style
        cursorStyle.transform = `translate(0)`
        cursorStyle.transition = `transform 0.5s`
        cursorStyle.opacity = "1"
    }

    function handleMouseMove(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {

        const cursorContainerHeight = cursorContainer.current!.offsetHeight
        const target = e.target as HTMLDivElement
        let { clientX, offsetY } = e.nativeEvent
        // console.log(e)
        if(isMouseDown) {
            let currentPosition = caroselStage.current!.scrollLeft
            let movement = e.movementX
            caroselStage.current!.scrollLeft = currentPosition - movement
        }
        //adjusting the horizontal position by half the cursor width
        clientX -= window.innerWidth - 160
        offsetY -= target.className === "company-anchor" ? 0 : cursorContainerHeight / 2
        cursorOuter.current!.style.transform = `translate(${clientX}px,${offsetY}px)`
        cursorOuter.current!.style.transition = isMouseDown ? "unset": "transform 0.1s"
    }

    function handleAnchor() {
        cursorOuter.current!.style.opacity = ".7"
    }

    function handleMouseDown() {
        setIsMouseDown(true)
    }

    function handleMouseUp() {
        setIsMouseDown(false)
    }

    return (
        <div 
            className="carosel-container" 
            onMouseOut={handleMouseOut} 
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            ref={caroselContainer}
        >
            <ul 
                className="carosel-stage" 
                onScroll={(e) => handleScroll(e)}
                ref={caroselStage}
                draggable={false}
            >
            {Companies.map(company => {

                return (
                    <div className="carosel-panel">
                        <p className="company-logo">{company.title}</p>
                        <p>_</p>
                        <div className="company-information">
                            <p>{company.title}</p>
                            <p 
                                className="carosel-content"
                            >
                                {company.content}
                                {company.anchor && 
                                    <a 
                                        className="company-anchor" 
                                        href={company.anchor}
                                        onMouseMove={handleAnchor}
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
                    ref={bar} 
                    className="progress-bar-thumb" 
                ></span>
            </div>
            <Cursor
                cursorContainer={cursorContainer}
                cursorOuter={cursorOuter}
                isMouseDown={isMouseDown}
            />
        </div>
    )
}

export default Carosel