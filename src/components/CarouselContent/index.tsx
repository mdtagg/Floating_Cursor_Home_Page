import { getCompanyData } from "../Carousel/utils/companies"
import Panel from "../Panel"

export interface TCarouselContent {
    setIsAnchorHover:React.Dispatch<React.SetStateAction<boolean>>
    setScrollPosition:React.Dispatch<React.SetStateAction<number>>
    carouselStage: React.MutableRefObject<HTMLUListElement | null>
}

const CaroselContent = (props:TCarouselContent) => {

    const { setScrollPosition,carouselStage,setIsAnchorHover } = props
    const Companies = getCompanyData()

    function handleScroll(e:React.UIEvent<HTMLUListElement, UIEvent>) {
        const target = e.target as HTMLUListElement
        const maxScroll = target.scrollWidth - target.clientWidth // Amount of overflow scroll
        const scrollPosition = ((maxScroll - target.scrollLeft) / maxScroll) * 100 //the percentage from 100 of scroll space left
        const adjusted = (100 - scrollPosition) * .4 // The percentage of scroll to adjust right including scrollBar width
        setScrollPosition(adjusted)
    }

    return (
        <ul 
            id="carousel-stage"
            onScroll={(e) => handleScroll(e)}
            ref={carouselStage}
            draggable={false}
        >
        {Companies.map(company => {
            return (
                <Panel
                    company={company}
                    setIsAnchorHover={setIsAnchorHover}
                />
            )
        })}
        </ul>
    )
}

export default CaroselContent