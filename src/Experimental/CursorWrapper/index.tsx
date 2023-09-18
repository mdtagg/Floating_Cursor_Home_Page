import { useRef,useEffect,useState,useCallback } from 'react'
import Content from "../Content"
import CursorBody from '../CursorBody'

const CursorWrapper = () => {

    const [ cursorEvent, setCursorEvent ] = useState<null | React.MouseEvent<HTMLDivElement, MouseEvent>>(null)

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
    // const carouselContainer = useRef<HTMLDivElement | null>(null) //used to grab offset from container
    // const carouselStage = useRef<HTMLUListElement | null>(null) //used to apply scroll position to progress bar element

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
        const target = cursorEvent.target as HTMLElement
        const cursorTarget = cursorEvent.target
        console.log(cursorEvent)
        const elementOffset = findOffset(target)

        let { clientX,pageY } = cursorEvent
        // pageY -= elementOffset - 

        clientX -= window.innerWidth - 160 //adjusting the horizontal position by the cursor width
        // pageY -= totalPageOffset + 80 //adjusting the vertical position by the total offset from the top of the carousel and half the cursor width
     
        const cursorPosition = {
            x:clientX,
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
        if(cursorEvent) handleMouseMove(cursorEvent);
    },[cursorEvent])

    return (
        
        <div style={{
            "display":"flex",
            }}>
            <Content 
                setCursorEvent={setCursorEvent} 
                cursorCoords={cursorCoords}
                cursorOuter={cursorOuter}
            />
        </div>
        
    )
}

export default CursorWrapper

//get ref onto first element in component
//get event functions into first element in content
