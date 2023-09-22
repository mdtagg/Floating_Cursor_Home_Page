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

    const [ isMouseDown, setIsMouseDown ] = useState(false)
    const [ isAnchorHover, setIsAnchorHover ] = useState(false)
    const [ isContainerlHover, setIsContainerHover ] = useState(false)

    const [ cursorCoords, setCursorCoords ] = useState({
        x:0,
        y:0,
        offset:0,
        transition:""
    })
    const cursorCoordsRef = useRef(cursorCoords) //used to pass cursor information to the scroll handler on window
    const cursorOuter = useRef<HTMLDivElement | null>(null) //used to grab offset from document

    function handleMouseLeave() {
        setIsContainerHover(false)
        const cursorPosition = {
            x:0,
            y:0,
            offset:window.scrollY,
            transition: "transform 1s"
        }
        setCursorCoords(cursorPosition)
        cursorCoordsRef.current! = cursorPosition
    }

    function handleMouseMove(e:React.MouseEvent<HTMLElement, MouseEvent>) {  
        setIsContainerHover(true)
        const cursorOffsetTop = getElementOffset() // removes the total offset from top of cursor position and adds page the pageY coordinate
   
        let { pageX,pageY } = e
        pageY -= cursorOffsetTop 
        pageX -= window.innerWidth - 160 //adjusting the horizontal position by the cursor width
      
        const cursorPosition = {
            x:pageX,
            y:pageY,
            offset:window.scrollY,
            transition: "transform 0.1s" 
        }
        setCursorCoords(cursorPosition)
        cursorCoordsRef.current! = cursorPosition // ref is used for coords in addition to state for handling window scroll
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
        if(isContainerlHover) {
            window.addEventListener("scroll",handleWindowScroll)
        }else {
            window.removeEventListener("scroll",handleWindowScroll)
        }
    },[isContainerlHover])


    return (
        <div 
            id="cursor-takeover-container"
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => setIsMouseDown(true)}
            onMouseUp={() => setIsMouseDown(false)}
            onClick={(e) => console.log(e)}
            
        >
            <Content
                setIsAnchorHover={setIsAnchorHover}
                isMouseDown={isMouseDown}
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

// could wrap content and cursor in context
//