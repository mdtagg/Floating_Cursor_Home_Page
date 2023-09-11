import "./index.css"
import { useState,useRef } from "react"
import { getCompanyData } from "./utils/companies"
import Cursor from "./Cursor"

const Carosel = () => {

    const Companies = getCompanyData()
    const [ isMouseDown, setIsMouseDown ] = useState(false)
    const bar = useRef<HTMLUListElement | null>(null)
    const cursorOuter = useRef<HTMLDivElement | null>(null)
    const cursorContainer = useRef<HTMLDivElement | null>(null)
    const cursor = useRef<HTMLDivElement | null>(null)
    const caroselContainer = useRef<HTMLDivElement | null>(null)
    const caroselStage = useRef<HTMLUListElement | null>(null)
    

    function handleScroll(e:React.UIEvent<HTMLUListElement, UIEvent>) {
        const target = e.target as HTMLUListElement
        const maxScroll = target.scrollWidth - target.clientWidth
        const scrollPosition = ((maxScroll - target.scrollLeft) / maxScroll) * 100
        const adjusted = (100 - scrollPosition) * .4
        bar.current!.style.left = `${adjusted}%`
    }

    function handleMouseOut() {
        let cursorStyle = cursorOuter.current!.style
        cursorStyle.transform = `translate(0)`
        cursorStyle.transition = `transform 0.5s`
        cursorStyle.opacity = "1"
    }

    function handleMouseMove(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        let target = e.target as HTMLDivElement
        let { screenX, offsetY } = e.nativeEvent
        if(isMouseDown) {
            let currentPosition = caroselStage.current!.scrollLeft
            let movement = e.nativeEvent.movementX
            caroselStage.current!.scrollLeft = currentPosition - movement
        }
        // else {
            const cursorContainerHeight = cursorContainer.current!.offsetHeight
            //adjusting the horizontal position by half the cursor width and the padding
            screenX -= window.innerWidth - 80 - 64
            offsetY -= target.className === "company-anchor" ? 100 : cursorContainerHeight / 2
            cursorOuter.current!.style.transform = `translate(${screenX}px,${offsetY}px)`
            cursorOuter.current!.style.transition = "transform 0.1s"
        // }
    }

    function handleAnchor() {
        cursorOuter.current!.style.opacity = ".7"
    }

    function handleMouseDown() {
        setIsMouseDown(true)
    }

    function handleMouseUp() {
        setIsMouseDown(false)
        // cursor.current!.style.height = "120px"
        // cursor.current!.style.width = "120px"
        // cursor.current!.textContent = "DRAG"
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
                <span ref={bar} className="progress-bar-thumb" style={{"width":"60%"}}></span>
            </div>
            <Cursor
                cursorContainer={cursorContainer}
                cursorOuter={cursorOuter}
                cursor={cursor}
                isMouseDown={isMouseDown}
            />
            {/* <div 
                className="cursor-takeover-container"
                ref={cursorContainer}
            >
                <div className="cursor-takeover-outer" ref={cursorOuter}>
                    <Icon icon="bx:caret-left" />
                    <div className="cursor-takeover-cursor" ref={cursor}>
                        
                        <span>DRAG</span>
                        
                    </div>
                    <Icon icon="bx:caret-right" />
                </div>
            </div> */}
        </div>
    )
}

export default Carosel