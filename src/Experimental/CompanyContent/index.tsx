import { getCompanyData } from "../../components/Carousel/utils/companies"
import './index.css'
import { useRef,useEffect } from "react"

interface CompanyContent {
    scrollWidth:number
    setScrollWidth:React.Dispatch<React.SetStateAction<number>>
    setScrollPosition:React.Dispatch<React.SetStateAction<number>>
    setIsAnchorHover:React.Dispatch<React.SetStateAction<boolean>>
    isMouseDown:boolean
}

const CompanyContent = (props:CompanyContent) => {

    const companyData = getCompanyData()
    const { setScrollPosition,setScrollWidth,scrollWidth,setIsAnchorHover,isMouseDown } = props
    const listRef = useRef<HTMLUListElement | null>(null)

    function handleScroll(e:React.UIEvent<HTMLElement, UIEvent>) {
        const target = e.target as HTMLUListElement
        const maxScroll = target.scrollWidth - target.clientWidth // Amount of overflow scroll
        const scrollPosition = ((maxScroll - target.scrollLeft) / maxScroll) * 100 //the percentage from 100 of scroll 
        const adjusted = (100 - scrollPosition) * ((100 - scrollWidth) * 0.01) // The percentage of scroll to adjust right including scrollBar width
        setScrollPosition(adjusted)
    }

    function handleMouseDown(e:React.MouseEvent<HTMLUListElement, MouseEvent>) {
        if(!isMouseDown) return;
        listRef.current!.scrollLeft = listRef.current!.scrollLeft - e.movementX //scrolls the carousel position horizonally with the mouse position
        
    }

    useEffect(() => {
        setScrollWidth((window.innerWidth / listRef.current!.scrollWidth) * 100)
    },[])
  
    return (
        <>
        <ul 
            onScroll={(e) => handleScroll(e)}
            onMouseMove={(e) => handleMouseDown(e)}
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
        })}
        </ul> 
    </>
    )
}

export { CompanyContent }