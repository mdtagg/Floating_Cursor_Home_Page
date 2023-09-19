import { useRef,useEffect,useState,useCallback } from 'react'

type TCursorBody = {
    cursorEvent:React.MouseEvent<HTMLDivElement, MouseEvent> | null
}

const FloatingCursor = ({cursorEvent}:TCursorBody) => {

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
        
        setIsCarouselHover(true)
        const elementOffset = findOffset(cursorOuter.current!)
    
        let { pageX,pageY } = cursorEvent
        pageY -= elementOffset! + 80
        pageX -= window.innerWidth - 160 //adjusting the horizontal position by the cursor width
      
        const cursorPosition = {
            x:pageX,
            y:pageY,
            offset:window.scrollY,
            transition: isCarouselHover ? "unset": "transform 0.1s"
        }
        setCursorCoords(cursorPosition)
        cursorCoordsRef.current! = cursorPosition

        // if(isMouseDown) { 
        //     carouselStage.current!.scrollLeft = carouselStage.current!.scrollLeft - e.movementX //scrolls the carousel position horizonally with the mouse position
        // }
    }

    function findOffset(target:HTMLElement,result=0) {
        const offsetParent = target.offsetParent as HTMLElement
        result += target.offsetTop
        if(!offsetParent || !offsetParent.offsetTop) return result
        findOffset(offsetParent,result)
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
                break 
            case "mouseleave":
                handleMouseLeave()
                break
        }

    },[cursorEvent])

    useEffect(() => {
        if(isCarouselHover) {
            window.addEventListener("scroll",handleWindowScroll)
        }else {
            window.removeEventListener("scroll",handleWindowScroll)
        }
    },[isCarouselHover])

return (
    <div style={{
        "height":"100%",
        "width":`${document.documentElement.clientWidth}px`,
        "pointerEvents":"none",
        "display":"flex",
        "justifyContent":"flex-end",
        "alignItems":"center",
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
                "marginRight":"4rem",
                "transform":`translate(${cursorCoords.x}px,${cursorCoords.y}px)`,
                "transition": `${cursorCoords.transition}`
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

export { FloatingCursor }