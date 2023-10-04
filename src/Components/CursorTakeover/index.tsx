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
    const [ cursorTransition,setCursorTransition ] = useState({x:0,y:0})

    const cursorPosition = useRef({
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
        const changeY = clientY - cursorPosition.current.y + cursorPosition.current.scrollChange
        const changeX = clientX - cursorPosition.current.x

        cursorPosition.current! = {
            ...cursorPosition.current!,
            transitionX:changeX,
            transitionY:changeY - cursorPosition.current.scrollChange,
        }

        setCursorTransition({
            x:changeX,
            y:changeY
        })

        const target = e.target as HTMLElement
        target.nodeName === "A" ? setIsAnchorHover(true) : setIsAnchorHover(false)
    
    }

    function handleMouseLeave() {
        isContainerHoverRef.current! = false
        cursorOuter.current!.style.transition = "transform 1s"
        setCursorTransition({
            x:0,
            y:0
        })
    }

    function handleMouseDown(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const target = e.target as HTMLDivElement
        if(target.id === "carousel-container") {
        }
        setIsMouseDown(true)
    }

    useEffect(() => {

        _setCursorPosition() //set cursor position within container on load

        const handleWindowScroll = () => {
            if(isContainerHoverRef.current) {
                const { scroll,transitionX,transitionY } = cursorPosition.current!
                const scrollChange = window.scrollY - scroll

                cursorPosition.current! = {
                    ...cursorPosition.current!,
                    scrollChange:scrollChange
                }
        
                setCursorTransition({
                    x:transitionX,
                    y:transitionY + cursorPosition.current.scrollChange
                })

            } 
            else _setCursorPosition();
        }
        window.addEventListener("scroll",handleWindowScroll)
    },[])

    function _setCursorPosition() {
        const { top, left } = cursorOuter.current!.getBoundingClientRect()
        const { offsetHeight,offsetWidth } = cursorOuter.current!

        cursorPosition.current = {
            ...cursorPosition.current!,
            x:left + offsetWidth / 2,
            y:top + offsetHeight / 2,
            scroll:window.scrollY
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
                    "transform":`translate(${cursorTransition.x}px,${cursorTransition.y}px)`,
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