import './index.css'

export type TCursorBody = {
    isMouseDown:boolean 
    color:string
    isAnchorHover:boolean
}

const CursorBody = (props:TCursorBody) => {

    const { isMouseDown,color,isAnchorHover } = props
    const cursorStyle = isMouseDown ? "mouse-down" : "mouse-up"
    const cursorVisibility = isAnchorHover ? "anchor-hover" : ""

    return (
        <div 
            id="cursor-takeover-body"
            className={`${cursorStyle} ${cursorVisibility}`}
            // style={{"color":`${color}`}}
        >
            {isMouseDown || isAnchorHover ? "" : "DRAG"}
        </div>
    )
}

export { CursorBody }