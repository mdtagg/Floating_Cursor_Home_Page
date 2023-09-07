import "./index.css"
import { useRef } from "react"
import { getCompanyData } from "./utils/companies"

const Carosel = () => {

    const Companies = getCompanyData()
    const container = useRef<HTMLUListElement | null>(null)
    const bar = useRef<HTMLUListElement | null>(null)
    const cursor = useRef<HTMLDivElement | null>(null)

    function handleScroll(e:React.UIEvent<HTMLUListElement, UIEvent>) {
        const target = e.target as HTMLUListElement
        const maxScroll = target.scrollWidth - target.clientWidth
        const scrollPosition = ((maxScroll - target.scrollLeft) / maxScroll) * 100
        const adjusted = (100 - scrollPosition) * .4
        bar.current!.style.left = `${adjusted}%`
    }

    function handleMouseOut(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        cursor.current!.style.transform = `translate(0)`
    }

    function handleMouseMove(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const { pageX,pageY } = e.nativeEvent
        const windowAdjust = window.innerHeight * .25
        cursor.current!.style.transform = `translate(${pageX - 60}px, ${pageY - windowAdjust - 100}px)`
    }

    return (
        <div className="carosel-container" onMouseOut={(e) => handleMouseOut(e)} onMouseMove={(e) => {handleMouseMove(e)}}>
            <ul className="carosel-stage" ref={container} onScroll={(e) => handleScroll(e)} >
            {Companies.map(company => {
                return (
                    <div className="carosel-panel">
                        <p>{company.title}</p>
                        <p>_</p>
                        <div>
                            <p>{company.title}</p>
                            <p className="carosel-content">{company.content}</p>
                        </div>
                    </div>
                )
            })}
            </ul>
            <div className="progress-bar-container">
                <span ref={bar} className="progress-bar-thumb" style={{"width":"60%"}}></span>
            </div>
            <div className="cursor-takeover-container">
                <div className="cursor-takeover-cursor" ref={cursor}>
                    <span>DRAG</span>
                </div>
            </div>
            
        </div>
    )
}

export default Carosel

/*
onMouseEnter={(e) => handleMouseEnter(e)}

function handleMouseEnter(e:React.MouseEvent<HTMLUListElement, MouseEvent>) {
        e.stopPropagation()
        let offsetLeft = cursor.current!.offsetLeft
        let offsetTop = cursor.current!.offsetTop
        
        console.log({offsetLeft,offsetTop})
    }

// const { clientX,clientY } = e
        // console.log(clientX,clientY)
        // const { offsetX,offsetY } = e.nativeEvent
        // console.log(offsetX,offsetY)
        // const { offsetLeft,offsetTop } = cursor.current!
        // console.log(offsetLeft,offsetTop)
        // const test = clientX - offsetLeft
        // const testTwo = clientY - offsetTop
        // console.log(test,testTwo)
        // cursor.current!.style.translate = `${test - 50}px ${testTwo}px`
*/