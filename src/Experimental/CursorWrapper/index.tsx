import { useRef,useEffect,useState,useCallback } from 'react'
import './index.css'
import { CarouselProps } from '../Carousel'

type TCursorWrapper = {
    Content:(props:CarouselProps) => JSX.Element
}

const CursorWrapper = (props:TCursorWrapper) => {

    const { Content } = props
    console.log(Content)

    const [ cursorEvent, setCursorEvent ] = useState<React.MouseEvent<HTMLDivElement, MouseEvent> | null>(null)
    const elemRef = useRef<HTMLElement | null>(null)
    // const [ isMouseDown, setIsMouseDown ] = useState(false)
    // const [ isAnchorHover, setIsAnchorHover ] = useState(false)
    const [ isCarouselHover, setIsCarouselHover ] = useState(false)
    // const [ scrollPosition, setScrollPosition ] = useState(0)

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
        // const test = cursorOuter.current!.offsetParent.offsetWidth
        setIsCarouselHover(true)
        const elementOffset = findOffset(cursorOuter.current!)
    
        let { pageX,pageY } = cursorEvent
        pageY -= elementOffset! + 80
        pageX -= window.innerWidth - 160 //adjusting the horizontal position by the cursor width
      
        const cursorPosition = {
            x:pageX,
            y:pageY,
            offset:window.scrollY,
            transition: "transform 0.1s" //isCarouselHover ? "unset": "transform 0.1s"
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
        <div 
            id="cursor-takeover-container"
        >
            <Content
                setCursorEvent={setCursorEvent}
            />
            <div 
                id="cursor-takeover-outer"
                ref={cursorOuter}
                style={{
                    "transform":`translate(${cursorCoords.x}px,${cursorCoords.y}px)`,
                    "transition": `${cursorCoords.transition}`
                }}
            >
                <div 
                    id="cursor-takeover-body"
                >
                    DRAG
                </div>
            </div>
        </div>
    )
}

export { CursorWrapper }