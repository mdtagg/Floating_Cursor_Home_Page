import { TCompanyData } from "../Carousel/utils/companies"
import "./index.css"

interface TPanel {
    company:TCompanyData
    setIsAnchorHover:React.Dispatch<React.SetStateAction<boolean>>
}

const Panel = (props:TPanel) => {

    const { company,setIsAnchorHover } = props 

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
}

export default Panel