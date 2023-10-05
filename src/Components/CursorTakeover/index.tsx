import { useRef, useEffect, useState, useCallback } from 'react'
import './index.css'

type TCustomCursor = {
    isMouseDown:boolean 
    isAnchorHover:boolean
    color:string
    text:string
}

type TCursorWrapper = {
    children:JSX.Element
    CustomCursor:(props:TCustomCursor) => JSX.Element
    color:string
    position:"center" | "left"
    text:string
}

export type TCursorCoords = {
    x: number;
    y: number;
    offset: number;
    transition: string;
}

const CursorTakeover = (props:TCursorWrapper) => {

    const { children, CustomCursor, color, position, text } = props

    const [ isMouseDown, setIsMouseDown ] = useState(false)
    const [ isAnchorHover, setIsAnchorHover ] = useState(false)

    const [ cursor, setCursor ] = useState({
        x:0,
        y:0,
        transitionX:0,
        transitionY:0,
        scroll:0,
        scrollChange:0
    })

    const isContainerHoverRef = useRef(false)
    const cursorOuter = useRef<HTMLDivElement | null>(null) //used to get the cursors current positions

    function handleMouseMove(e:React.MouseEvent<HTMLElement, MouseEvent>) {

        isContainerHoverRef.current = true
        cursorOuter.current!.style.transition = "transform 0.1s"

        const { clientX, clientY } = e 
        const changeY = clientY - cursor.y 
        const changeX = clientX - cursor.x

        setCursor({
            ...cursor,
            transitionX:changeX,
            transitionY:changeY
        })

        const target = e.target as HTMLElement
        target.nodeName === "A" ? setIsAnchorHover(true) : setIsAnchorHover(false)
    
    }

    function handleMouseLeave() {
        isContainerHoverRef.current! = false
        cursorOuter.current!.style.transition = "transform 1s"
        
        setCursor({
            ...cursor,
            transitionX:0,
            transitionY:0,
            scrollChange:0
        })
    }

    function handleMouseDown(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const target = e.target as HTMLDivElement
        if(target.id === "carousel-container") {
        }
        setIsMouseDown(true)
    }

    const handleWindowScroll = useCallback(() => {
        if(isContainerHoverRef.current) {
            const { scrollChange,scroll,transitionY,y } = cursor
            const change = window.scrollY - scroll 

            setCursor({
                ...cursor,
                y:y - scrollChange,
                transitionY:transitionY + scrollChange,
                scroll:window.scrollY,
                scrollChange:change
            })

        } 
        else _setCursorPosition();
    },[cursor])

    window.onscroll = handleWindowScroll

    useEffect(() => {
        _setCursorPosition() //set cursor position within container on load
    },[])

    function _setCursorPosition() {
        const { top, left } = cursorOuter.current!.getBoundingClientRect()
        const { offsetHeight,offsetWidth } = cursorOuter.current!

        setCursor({
            ...cursor,
            x:left + offsetWidth / 2,
            y:top + offsetHeight / 2,
            scroll:window.scrollY
        })
        
    }

    return (
        <div 
            id="cursor-takeover-container"
            onMouseMove={(e) => handleMouseMove(e)}
            onMouseLeave={handleMouseLeave}
            onMouseDown={(e) => handleMouseDown(e)}
            onMouseUp={() => setIsMouseDown(false)}
            style={{
                "justifyContent":`${position === 'center' ? 'center' : 'flex-end'}`
            }}
        >
            {children}
            <div 
                id="cursor-takeover-outer"
                ref={cursorOuter}
                style={{
                    "transform":`translate(${cursor.transitionX}px,${cursor.transitionY}px)`,
                    "transition": `transform 1s`
                }}
            >
                <CustomCursor
                    isMouseDown={isMouseDown}
                    isAnchorHover={isAnchorHover}
                    color={color}
                    text={text}
                />
                
            </div>
        </div>
    )
}

export { CursorTakeover }