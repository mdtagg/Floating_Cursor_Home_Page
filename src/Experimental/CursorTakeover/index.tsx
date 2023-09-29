import { useRef, useEffect, useState, useCallback } from 'react'
import './index.css'

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
        const target = e.target as HTMLElement
        target.nodeName === "A" ? setIsAnchorHover(true) : setIsAnchorHover(false)

        setIsContainerHover(true)

        const cursorOffsetTop = getElementOffset() // removes the total offset from top of cursor position and adds page the pageY coordinate
   
        let { pageX, pageY } = e
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
        const { x, y, offset } = cursorCoordsRef.current!
        const adjustedY = y - offset

        setCursorCoords({
            ...cursorCoords,
            x:x,
            y:adjustedY + window.scrollY
        })
    },[])

    useEffect(() => {
        if(isContainerHover) {
            window.addEventListener("scroll",handleWindowScroll)
        }else {
            window.removeEventListener("scroll",handleWindowScroll)
        }
    },[isContainerHover])


    return (
        <div 
            id="cursor-takeover-container"
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseLeave={handleMouseLeave}
            onMouseDown={() => setIsMouseDown(true)}
            onMouseUp={() => setIsMouseDown(false)}
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