import { useRef,useEffect,useState,useCallback } from 'react'
import './index.css'
import { CarouselProps } from '../Carousel'
import { CustomCursor } from '../CustomCursor'

type TCursorWrapper = {
    Content:(props:CarouselProps) => JSX.Element
}

export type TCursorCoords = {
    x: number;
    y: number;
    offset: number;
    transition: string;
}

const CursorWrapper = (props:TCursorWrapper) => {

    const { Content } = props

    const [ cursorEvent, setCursorEvent ] = useState<React.MouseEvent<HTMLDivElement, MouseEvent> | null>(null)
    const [ isMouseDown, setIsMouseDown ] = useState(false)
    const [ isAnchorHover, setIsAnchorHover ] = useState(false)
    const [ isCarouselHover, setIsCarouselHover ] = useState(false)

    const [ cursorCoords, setCursorCoords ] = useState({
        x:0,
        y:0,
        offset:0,
        transition:""
    })
    // console.log(cursorCoords)
    const cursorCoordsRef = useRef(cursorCoords) //used to pass cursor information to the scroll handler on window
    const cursorOuter = useRef<HTMLDivElement | null>(null) //used to grab offset from document
    // const cursorContainer = useRef<HTMLDivElement | null>(null)

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
        const cursorOffsetTop = getElementOffset()
        // const containerOffset = offsetParent!.getBoundingClientRect().top + window.scrollY
        // const test = offsetParent!.offsetHeight / 2
        // const offsetTotal = containerOffset + test
   
        let { pageX,pageY } = cursorEvent
        pageY -= cursorOffsetTop
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

    function getElementOffset() {
        const offsetParent = cursorOuter.current!.offsetParent as HTMLDivElement
        const containerOffsetTop = offsetParent!.getBoundingClientRect().top + window.scrollY
        const cursorOffset = offsetParent!.offsetHeight / 2
        return containerOffsetTop + cursorOffset
        
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
            case "mousedown":
                setIsMouseDown(true)
                break 
            case "mouseup":
                setIsMouseDown(false)
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
            <CustomCursor
                cursorOuter={cursorOuter}
                cursorCoords={cursorCoords}
                isMouseDown={isMouseDown}
                isAnchorHover={isAnchorHover}
            />
        </div>
    )
}

export { CursorWrapper }