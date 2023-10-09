import { useRef, useEffect, useState } from 'react'
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
    position:"center" | "right"
    text:string
}

export type TCursorCoords = {
    x: number;
    y: number;
    offset: number;
    transition: string;
}

//bug: when the cursor is transitioning back on leave and the user renters, the scroll handler sets the position values to where the cursor is before its back to its starting location

const CursorTakeover = (props:TCursorWrapper) => {

    const { children, CustomCursor, color, position, text } = props

    const [ isMouseDown, setIsMouseDown ] = useState(false)
    const [ isAnchorHover, setIsAnchorHover ] = useState(false)

    /*
    cursorTransition state is used to trigger renrenders when the transition values are updated
    cursorPositionRef is used to transfer positional information on the cursor between rerenders
     */
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

    const isContainerHoverRef = useRef(false) // used to perform positional calculations on the cursor one way if the container is hovered over and another way for components that arnt hovered over
    const cursorOuter = useRef<HTMLDivElement | null>(null) //used to get the cursors current positions
    const transitionRef = useRef(false)

    function handleMouseMove(e:React.MouseEvent<HTMLElement, MouseEvent>) {

        checkIsAnchor(e) // changes cursor body opacity if an anchor element is hovered
        changeHover(true,"transform 0.1s") // changes cursorHoverRef boolean based on if container is hovered over and sets a new transition value

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

    function checkIsAnchor(e:React.MouseEvent<HTMLElement, MouseEvent>) {
        const target = e.target as HTMLElement
        target.nodeName === "A" ? setIsAnchorHover(true) : setIsAnchorHover(false)
    }

    function handleMouseLeave() {

        transitionRef.current = true
        changeHover(false,"transform 1s")
        
        setCursorTransition({
            ...cursorTransition,
            transitionX:0,
            transitionY:0,
        })
    }

    function changeHover(isHover:boolean,transitionVal:string) {
        isContainerHoverRef.current! = isHover
        cursorOuter.current!.style.transition = transitionVal
    }

    function handleMouseDown(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const target = e.target as HTMLDivElement
        if(target.id === "carousel-container") {
        }
        setIsMouseDown(true)
    }

    const handleWindowScroll = () => {

        const { prevScroll, y, transitionY, transitionX } = cursorPositionRef.current
        const scrollDiff = window.scrollY - prevScroll

        if(isContainerHoverRef.current) {
            
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
        else if(transitionRef.current === true) {
            // if window is scrolled while cursor is transitioning back on leave its position is 
            //calculated from its starting position, not where it is in the transition
            cursorPositionRef.current = {
                ...cursorPositionRef.current,
                y:y - scrollDiff,
                prevScroll:window.scrollY
            }
        }
        else _setCursorPosition()
    }

    useEffect(() => {
        _setCursorPosition() //set cursor position within container on load
        window.addEventListener("scroll",handleWindowScroll)
    },[])

    function _setCursorPosition() {
        const { top, left } = cursorOuter.current!.getBoundingClientRect()
        const { offsetHeight, offsetWidth } = cursorOuter.current!

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
                onTransitionEnd={() => transitionRef.current = false}
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