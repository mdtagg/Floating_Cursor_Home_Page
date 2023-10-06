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

    const [ cursorTransition, setCursorTransition ] = useState({
        transitionX:0,
        transitionY:0,
    })

    const cursorPositionRef = useRef({
        x:0,
        y:0,
        prevScroll:0,
        transitionX:0,
        transitionY:0
    })

    const isContainerHoverRef = useRef(false)
    const cursorOuter = useRef<HTMLDivElement | null>(null) //used to get the cursors current positions

    function handleMouseMove(e:React.MouseEvent<HTMLElement, MouseEvent>) {

        const target = e.target as HTMLElement
        target.nodeName === "A" ? setIsAnchorHover(true) : setIsAnchorHover(false)

        isContainerHoverRef.current = true
        cursorOuter.current!.style.transition = "transform 0.1s"

        const { x, y } = cursorPositionRef.current
        const { clientX, clientY } = e 

        const changeProps = {
            transitionX:clientX - x,
            transitionY:clientY - y
        }

        cursorPositionRef.current = {
            ...cursorPositionRef.current,
            ...changeProps
        }

        setCursorTransition({
            ...changeProps
        })
    }

    function handleMouseLeave() {
        isContainerHoverRef.current! = false
        cursorOuter.current!.style.transition = "transform 1s"
        
        setCursorTransition({
            ...cursorTransition,
            transitionX:0,
            transitionY:0,
        })
    }

    function handleMouseDown(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const target = e.target as HTMLDivElement
        if(target.id === "carousel-container") {
        }
        setIsMouseDown(true)
    }

    const handleWindowScroll = () => {
       
        if(isContainerHoverRef.current) {

            const { prevScroll, y, transitionY, transitionX } = cursorPositionRef.current
            const scrollDiff = window.scrollY - prevScroll
            
            cursorPositionRef.current = {
                ...cursorPositionRef.current,
                y: y - scrollDiff,
                transitionY:transitionY + scrollDiff,
                prevScroll:window.scrollY
            }

            setCursorTransition({
                transitionX:transitionX,
                transitionY:transitionY 
            })
            
        } 
        else _setCursorPosition()
    }

    useEffect(() => {
        _setCursorPosition() //set cursor position within container on load
        window.addEventListener("scroll",handleWindowScroll)
    },[])

    function _setCursorPosition() {
        const { top, left } = cursorOuter.current!.getBoundingClientRect()
        const { offsetHeight,offsetWidth } = cursorOuter.current!

        cursorPositionRef.current = {
            ...cursorPositionRef.current,
            x:left + offsetWidth / 2,
            y:top + offsetHeight / 2,
            prevScroll:window.scrollY
        }
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
                    "transform":`translate(${cursorTransition.transitionX}px,${cursorTransition.transitionY}px)`,
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