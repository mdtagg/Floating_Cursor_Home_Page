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
        // x:0,
        // y:0,
        transitionX:0,
        transitionY:0,
        // scroll:0,
        // scrollChange:0
    })

    const cursorPositionRef = useRef({x:0,y:0,prevScroll:0,transitionX:0,transitionY:0})

    const isContainerHoverRef = useRef(false)
    const cursorOuter = useRef<HTMLDivElement | null>(null) //used to get the cursors current positions

    function handleMouseMove(e:React.MouseEvent<HTMLElement, MouseEvent>) {

        isContainerHoverRef.current = true
        cursorOuter.current!.style.transition = "transform 0.1s"

        // const { pageX,pageY } = e
        const { clientX, clientY } = e 
        const changeY = clientY - cursorPositionRef.current!.y 
        const changeX = clientX - cursorPositionRef.current!.x
        console.log(clientY,cursorPositionRef.current.y)

        cursorPositionRef.current = {
            ...cursorPositionRef.current,
            transitionX:changeX,
            transitionY:changeY
        }

        setCursorTransition({
            transitionX:changeX,
            transitionY:changeY
        })

        // console.log(cursorPositionRef.current)

        const target = e.target as HTMLElement
        target.nodeName === "A" ? setIsAnchorHover(true) : setIsAnchorHover(false)
    
    }

    function handleMouseLeave() {
        isContainerHoverRef.current! = false
        cursorOuter.current!.style.transition = "transform 1s"
        
        setCursorTransition({
            ...cursorTransition,
            transitionX:0,
            transitionY:0,
            // scrollChange:0
        })
    }

    function handleMouseDown(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const target = e.target as HTMLDivElement
        if(target.id === "carousel-container") {
        }
        setIsMouseDown(true)
    }

    const handleWindowScroll = () => {
       

        //incorrectly sets cursor position becuase after the cursor moves its no longer default position

        if(isContainerHoverRef.current) {

            const { prevScroll } = cursorPositionRef.current
            const currentScroll = window.scrollY
            

            cursorPositionRef.current ={
                ...cursorPositionRef.current,
                y: cursorPositionRef.current.y - (currentScroll - prevScroll),
                transitionY:cursorPositionRef.current.transitionY + (currentScroll - prevScroll),
                prevScroll:currentScroll
            }

            setCursorTransition({
                transitionX:cursorPositionRef.current.transitionX,
                transitionY:cursorPositionRef.current.transitionY 
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
        // console.log(cursorPositionRef.current)
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