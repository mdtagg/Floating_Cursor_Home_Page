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

    function handleMouseEnter(e:React.MouseEvent<HTMLUListElement, MouseEvent>) {
        // console.log(e)
        e.stopPropagation()
        const { clientX,clientY } = e
        console.log(clientX,clientY)
        const { offsetLeft,offsetTop } = cursor.current!
        console.log(offsetLeft,offsetTop)
        const test = clientX - offsetLeft
        const testTwo = clientY - offsetTop
        console.log(test,testTwo)
        cursor.current!.style.translate = `${test}px ${testTwo}px`
    }

    function handleMouseOut() {
        cursor.current!.style.translate = "0"
    }

    function handleMouseMove(e:React.MouseEvent<HTMLUListElement, MouseEvent>) {
        e.stopPropagation()
        const target = e.nativeEvent
        
    }

    return (
        <div className="carosel-container">
            <ul className="carosel-stage" ref={container} onScroll={(e) => handleScroll(e)} onMouseOut={handleMouseOut} onMouseEnter={(e) => handleMouseEnter(e)} onMouseMove={(e) => handleMouseMove(e)}>
            {Companies.map(company => {
                return (
                    <div className="carosel-panel">
                        <p>{company.title}</p>
                        <div>_</div>
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
            {/* <div className="cursor-takeover-container"> */}
                <div className="cursor-takeover-cursor" ref={cursor}>
                    <span>DRAG</span>
                {/* </div> */}
            </div>
            
        </div>
    )
}

export default Carosel