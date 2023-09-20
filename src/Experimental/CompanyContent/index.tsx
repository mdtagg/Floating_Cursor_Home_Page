import { getCompanyData } from "../../components/Carousel/utils/companies"
import './index.css'

const CompanyContent = () => {

    const companyData = getCompanyData()
  
    return (
        <>
        <ul 
            // onScroll={(e) => handleScroll(e)}
            // draggable={false}
            className="company-list"
        >
        {companyData.map(company => {
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
                                // onMouseEnter={() => setIsAnchorHover(true)}
                                // onMouseLeave={() => setIsAnchorHover(false)}
                            >
                                here
                            </a>
                        }
                    </p>
                </div>
            </div>
            )
        })}
        {/* <FloatingCursor
            cursorEvent={cursorEvent}
        /> */}
        </ul> 
        
    </>
    )
}

export { CompanyContent }