import { getCompanyData } from "../../components/Carousel/utils/companies"
import './index.css'
import { useRef,useEffect } from "react"

interface CompanyContent {
    // setScrollPosition:React.Dispatch<React.SetStateAction<{
    //     scroll: number;
    //     width: number;
    // }>>
    setScrollPosition:React.Dispatch<React.SetStateAction<number>>
}

const CompanyContent = (props:CompanyContent) => {

    const companyData = getCompanyData()
    const { setScrollPosition } = props
    const listRef = useRef<HTMLUListElement | null>(null)

    function handleScroll(e:React.UIEvent<HTMLElement, UIEvent>) {
        const target = e.target as HTMLUListElement
        const maxScroll = target.scrollWidth - target.clientWidth // Amount of overflow scroll
        const scrollPosition = ((maxScroll - target.scrollLeft) / maxScroll) * 100 //the percentage from 100 of scroll 
        const adjusted = (100 - scrollPosition) * .4 // The percentage of scroll to adjust right including scrollBar width
        console.log({maxScroll,scrollPosition,adjusted})
        // console.log({adjusted})
        setScrollPosition(adjusted)
    }

    // useEffect(() => {
    //     setScrollPosition((prev) => {
    //         return {
    //             scroll:prev.scroll,
    //             width: (window.innerWidth / listRef.current.scrollWidth) * 100
    //         }
    //     })
    // },[])
  
    return (
        <>
        <ul 
            onScroll={(e) => handleScroll(e)}
            draggable={false}
            className="company-list"
            ref={listRef}
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
        </ul> 
    </>
    )
}

export { CompanyContent }