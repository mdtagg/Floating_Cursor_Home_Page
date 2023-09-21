import "./index.css"
import { TCursorCoords } from "../CursorWrapper"
import FloatingCarets from "../FloatingCarets"
import { CursorBody } from "../CursorBody"

interface TCursorBody {
    cursorOuter:React.MutableRefObject<HTMLDivElement | null>
    cursorCoords:TCursorCoords
    isMouseDown:boolean
    isAnchorHover:boolean
}

const CustomCursor = (props:TCursorBody) => {

    const { cursorOuter,cursorCoords,isMouseDown,isAnchorHover } = props

    return (
        <>
        
        <div 
            id="cursor-takeover-outer"
            ref={cursorOuter}
            style={{
                "transform":`translate(${cursorCoords.x}px,${cursorCoords.y}px)`,
                "transition": `${cursorCoords.transition}`
            }}
        >
            {isMouseDown ?
                <FloatingCarets
                    color="pink"
                    isAnchorHover={isAnchorHover}
                />
                :
                <CursorBody
                    isMouseDown={false}
                    color="pink"
                    isAnchorHover={isAnchorHover}
                />}
        </div>
        
        </>
    )
}

export { CustomCursor }