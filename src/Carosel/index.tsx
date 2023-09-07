import "./index.css"
import { useState,useRef } from "react"
import { getCompanyData } from "./utils/companies"
import { Icon } from '@iconify/react';

const Carosel = () => {

    const Companies = getCompanyData()
    const [ carets,setCarets ] = useState(false)
    const bar = useRef<HTMLUListElement | null>(null)
    const cursor = useRef<HTMLDivElement | null>(null)
    const cursorContainer = useRef<HTMLDivElement | null>(null)

    function handleScroll(e:React.UIEvent<HTMLUListElement, UIEvent>) {
        const target = e.target as HTMLUListElement
        const maxScroll = target.scrollWidth - target.clientWidth
        const scrollPosition = ((maxScroll - target.scrollLeft) / maxScroll) * 100
        const adjusted = (100 - scrollPosition) * .4
        bar.current!.style.left = `${adjusted}%`
    }

    function handleMouseEnter(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        handleMouseMove(e)
        cursor.current!.style.transition = `transform 0.1s`
    }

    function handleMouseOut() {
        let cursorStyle = cursor.current!.style
        cursorStyle.transform = `translate(0)`
        cursorStyle.transition = `transform 0.5s`
        cursorStyle.opacity = "1"
        cursor.current!.textContent = "DRAG"
    }

    function handleMouseMove(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        let target = e.target as HTMLDivElement
        let { screenX,offsetY } = e.nativeEvent
        const cursorContainerHeight = cursorContainer.current!.offsetHeight
        
        //adjusting the horizontal position by half the cursor width and the padding
        screenX -= window.innerWidth - 60 - 64
        offsetY -= target.className === "company-anchor" ? 100 : cursorContainerHeight / 2
        cursor.current!.style.transform = `translate(${screenX}px,${offsetY}px)`
        cursor.current!.style.transition = `transform 0.1s`
    }

    function handleAnchor() {
        cursor.current!.style.opacity = ".7"
        cursor.current!.textContent = ""
    }

    function handleMouseDown() {
        setCarets(!carets)
        console.log(cursor.current!.style)
        cursor.current!.style.height = "80px"
        cursor.current!.style.width = "80px"
        cursor.current!.textContent = ""

    }

    function handleMouseUp() {
        cursor.current!.style.height = "120px"
        cursor.current!.style.width = "120px"
        cursor.current!.textContent = "DRAG"

    }

    return (
        <div 
            className="carosel-container" 
            onMouseEnter={(e) => handleMouseEnter(e)} 
            onMouseOut={handleMouseOut} 
            onMouseMove={(e) => {handleMouseMove(e)}}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <ul 
                className="carosel-stage" 
                onScroll={(e) => handleScroll(e)}
            >
            {Companies.map(company => {

                return (
                    <div className="carosel-panel">
                        <p>{company.title}</p>
                        <p>_</p>
                        <div>
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
            <div 
                className="cursor-takeover-container"
                ref={cursorContainer}
            >
                <Icon icon="bx:caret-left" />

                <div className="cursor-takeover-cursor" ref={cursor}>
                    
                    <span>DRAG</span>
                    
                </div>
                <Icon icon="bx:caret-right" />

            </div>
        </div>
    )
}

export default Carosel