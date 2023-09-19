import "./index.css"

const Carousel = (props) => {

    function handleScroll(e:React.UIEvent<HTMLUListElement, UIEvent>) {
        const target = e.target as HTMLUListElement
        const maxScroll = target.scrollWidth - target.clientWidth // Amount of overflow scroll
        const scrollPosition = ((maxScroll - target.scrollLeft) / maxScroll) * 100 //the percentage from 100 of scroll space left
        const adjusted = (100 - scrollPosition) * .4 // The percentage of scroll to adjust right including scrollBar width
        // setScrollPosition(adjusted)
    }

    return (
        <>
        <ul 
            id="carousel-stage"
            onScroll={(e) => handleScroll(e)}
            // ref={carouselStage}
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
        <div className="progress-bar-container">
        <span 
            className="progress-bar-thumb" 
            style={{"left":`${scrollPosition}%`}}
        ></span>
    </div>
    </>
    )
}

export { Carousel }