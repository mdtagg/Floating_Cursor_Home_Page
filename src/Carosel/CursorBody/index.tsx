import { TCursorStyles } from "../Cursor"
import "./index.css"

const CursorBody = (props:TCursorStyles) => {

    const { isMouseDown,isAnchorHover } = props
    const mouseStyle = isMouseDown ? "mouse-down" : "mouse-up"
    const hoverStyle = isAnchorHover ? "hoverStyle" : ""

    return (
        <div 
            className={`cursor-takeover-cursor ${mouseStyle} ${hoverStyle}`} 
            style={{"border":"1px solid black"}}
        >
            {isMouseDown || isAnchorHover ? "" : "DRAG"}
        </div>
    )
}

export default CursorBody