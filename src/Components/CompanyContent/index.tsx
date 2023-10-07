import { getCompanyData } from '../../utils/getCompanyData'
import { v4 as uuidv4 } from 'uuid'
import './index.css'

const CompanyContent = () => {

    const companyData = getCompanyData()
  
    return (
        <>
        {companyData.map(company => {
            return (
                <div 
                    className="carousel-panel"
                    key={uuidv4()}
                >
                    <p 
                        className="company-logo"
                    >
                        {company.title}
                    </p>
                    <p>
                        _
                    </p>
                    <div 
                        className="company-information"
                    >
                        <p>
                            {company.title}
                        </p>
                        <p 
                            className="carousel-content"
                        >
                            {company.content}
                            {company.anchor && 
                                <a 
                                    className="company-anchor" 
                                    href={company.anchor}
                                >
                                    here
                                </a>
                            }
                        </p>
                    </div>
                </div>
            )
        })}
    </>
    )
}

export { CompanyContent }