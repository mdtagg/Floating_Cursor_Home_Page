import "./index.css"
import { useRef } from "react"
import { getCompanyData } from "./utils/companies"

const Carosel = () => {

    const Companies = getCompanyData()
    const bar = useRef<HTMLUListElement | null>(null)

    function handleScroll(e:React.UIEvent<HTMLUListElement, UIEvent>) {
        const target = e.target as HTMLUListElement
        const maxScroll = target.scrollWidth - target.clientWidth
        const scrollPosition = ((maxScroll - target.scrollLeft) / maxScroll) * 100
        const adjusted = (100 - scrollPosition) * .4
        bar.current!.style.left = `${adjusted}%`
    }

    return (
        <div className="carosel-container">
            <ul className="carosel-stage" onScroll={(e) => handleScroll(e)}>
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
            
        </div>
    )
}

export default Carosel