import { useRef, useEffect, useState, useCallback } from 'react'
import './index.css'

type TCursorAdjustments = {
    top:number 
    left:number
}

type TCustomCursor = {
    isMouseDown:boolean 
    isAnchorHover:boolean
    color:string
}

type TCursorWrapper = {
    children:JSX.Element
    CustomCursor:(props:TCustomCursor) => JSX.Element
    color:string
}

export type TCursorCoords = {
    x: number;
    y: number;
    offset: number;
    transition: string;
}

const CursorTakeover = (props:TCursorWrapper) => {

    const { children, CustomCursor, color } = props

    const [ isMouseDown, setIsMouseDown ] = useState(false)
    const [ isAnchorHover, setIsAnchorHover ] = useState(false)
    const [ isContainerHover, setIsContainerHover ] = useState(false)
    const [ cursorAdjustments, setCursorAdjustments ] = useState<null | TCursorAdjustments>(null)

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

        if(!isContainerHover) return;
        const { x, y, offset, transition } = cursorCoordsRef.current!

        const cursorPosition = {
            x: x + e.movementX,
            y: y + e.movementY,
            offset: offset,
            transition: transition
        }
        setCursorCoords(cursorPosition)
        cursorCoordsRef.current! = cursorPosition
    }

    function getElementOffset() {

        const { top, left } = cursorOuter.current!.getBoundingClientRect()
        const { offsetHeight, offsetWidth } = cursorOuter.current!

        //adjusts cursor position if reentry into container occurs before cursor is fully reset
        const adjustments = {
            topAdjust: top - cursorAdjustments!.top,
            leftAdjust: left - cursorAdjustments!.left
        }

        const cursorOffsetTop = top + (offsetHeight / 2) + window.scrollY - adjustments.topAdjust
        const cursorOffsetLeft = left + (offsetWidth / 2) + window.scrollX - adjustments.leftAdjust

        return { cursorOffsetTop, cursorOffsetLeft }
    }

    const handleWindowScroll = useCallback(() => {
        const { x, y, offset } = cursorCoordsRef.current!
        const adjustedY = y - offset

        setCursorCoords({
            ...cursorCoords,
            x:x,
            y:adjustedY + window.scrollY
        })
    },[])

    function handleEnter(e:React.MouseEvent<HTMLElement, MouseEvent>) {

        if(isContainerHover) return 
        
        const target = e.target as HTMLElement
        target.nodeName === "A" ? setIsAnchorHover(true) : setIsAnchorHover(false)

        setIsContainerHover(true)

        const cursorOffsets = getElementOffset() // removes the total offset from top of cursor position and adds page to the pageY coordinate
   
        let { pageX, pageY } = e
        pageY -= cursorOffsets.cursorOffsetTop
        pageX -= cursorOffsets.cursorOffsetLeft
      
        const cursorPosition = {
            x:pageX,
            y:pageY,
            offset:window.scrollY,
            transition: "transform 0.1s" 
        }
        setCursorCoords(cursorPosition)
        cursorCoordsRef.current! = cursorPosition // ref is used for coords in addition to state for handling window scroll
    }

    useEffect(() => {
        if(isContainerHover) {
            window.addEventListener("scroll",handleWindowScroll)
        }else {
            window.removeEventListener("scroll",handleWindowScroll)
        }
    },[isContainerHover])

    useEffect(() => {
        const { top, left } = cursorOuter.current!.getBoundingClientRect()
        
        setCursorAdjustments({
            top:top,
            left:left
        })

    },[window.innerWidth, window.innerHeight])

    return (
        <div 
            id="cursor-takeover-container"
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => setIsMouseDown(true)}
            onMouseUp={() => setIsMouseDown(false)}
            onMouseEnter={handleEnter}
        >
            {children}
            <div 
                id="cursor-takeover-outer"
                ref={cursorOuter}
                style={{
                    "transform":`translate(${cursorCoords.x}px,${cursorCoords.y}px)`,
                    "transition": `${cursorCoords.transition}`
                }}
            >
                <CustomCursor
                    isMouseDown={isMouseDown}
                    isAnchorHover={isAnchorHover}
                    color={color}
                />
                
            </div>
        </div>
    )
}

export { CursorTakeover }