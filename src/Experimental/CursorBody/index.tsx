import { TCoords } from "../../components/Carousel"
import { useRef,useEffect,useState,useCallback } from 'react'

type TCursorBody = {
    cursorEvent:React.MouseEvent<HTMLDivElement, MouseEvent>
}

const CursorBody = ({cursorEvent}:TCursorBody) => {
    // console.log(cursorEvent)

    const [ isMouseDown, setIsMouseDown ] = useState(false)
    const [ isAnchorHover, setIsAnchorHover ] = useState(false)
    const [ isCarouselHover, setIsCarouselHover ] = useState(false)
    const [ scrollPosition, setScrollPosition ] = useState(0)

    const [ cursorCoords, setCursorCoords ] = useState({
        x:0,
        y:0,
        offset:0,
        transition:""
    })
    
    const cursorCoordsRef = useRef(cursorCoords) //used to pass cursor information to the scroll handler on window
    const cursorOuter = useRef<HTMLDivElement | null>(null) //used to grab offset from document

    function handleMouseEnter(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        setIsCarouselHover(true)
        handleMouseMove(e)
    }

    function handleMouseLeave() {
        setIsCarouselHover(false)
        const cursorPosition = {
            x:0,
            y:0,
            offset:window.scrollY,
            transition: "transform 1s"
        }
        setCursorCoords(cursorPosition)
        cursorCoordsRef.current! = cursorPosition
    }

    function handleMouseMove(cursorEvent:React.MouseEvent<HTMLDivElement, MouseEvent>) {      
        // const totalPageOffset = carouselContainer.current!.offsetTop + cursorOuter.current!.offsetTop
        // const target = cursorEvent.target as HTMLElement
        // console.log(cursorEvent)
        const elementOffset = findOffset(cursorOuter.current!)
        console.log(elementOffset)

        let { pageX,pageY } = cursorEvent
        pageY -= elementOffset + 80
        pageX -= window.innerWidth - 160 //adjusting the horizontal position by the cursor width
        // pageY -= totalPageOffset + 80 //adjusting the vertical position by the total offset from the top of the carousel and half the cursor width
        cursorOuter.current!.style.transform = `translate(${pageX}px,${pageY}px`
        console.log({pageX})
        const cursorPosition = {
            x:pageX,
            y:pageY,
            offset:window.scrollY,
            transition: isMouseDown ? "unset": "transform 0.1s"
        }
        setCursorCoords(cursorPosition)
        cursorCoordsRef.current! = cursorPosition

        // if(isMouseDown) { 
        //     carouselStage.current!.scrollLeft = carouselStage.current!.scrollLeft - e.movementX //scrolls the carousel position horizonally with the mouse position
        // }
    }

    function findOffset(target,result=0) {
        const { offsetParent } = target
        result += target.offsetTop
        if(!offsetParent.offsetTop) return result
        findOffset(offsetParent)
    }

    const handleWindowScroll = useCallback(() => {
        const { x,y,offset } = cursorCoordsRef.current!
        const adjustedY = y - offset

        setCursorCoords({
            ...cursorCoords,
            x:x,
            y:adjustedY + window.scrollY
        })

    },[])

    useEffect(() => {
        if(!cursorEvent) return
        switch(cursorEvent.type) {
            case "mousemove":
                handleMouseMove(cursorEvent)
        }
    },[cursorEvent])

return (
    <div style={{
        "height":"100%",
        "width":`${document.documentElement.clientWidth}px`,
        "border":"1px solid black",
        "pointerEvents":"none",
        "display":"flex",
        "justifyContent":"flex-end",
        "alignItems":"center",
        "backgroundColor":"yellow"
    }}>

    
    <div 
        ref={cursorOuter}
        style={{
            "height":"160px",
            "width":"160px",
            "border":"1px solid black",
            "display":"flex",
            "alignItems":"center",
            "justifyContent":"center",
            "position":"absolute",
            "marginRight":"4rem"
        }}
        id="cursor-outer"
    >

        <div 
            className={`cursor-takeover-cursor`} 
            style={{
                "backgroundColor":`pink`,
                "height":"120px",
                "width":"120px",
                // "transform":`translate(${cursorCoords.x}px,${cursorCoords.y}px)`
            }}
        >
            DRAG
        </div>
    </div>
    </div>
)
}

export default CursorBody