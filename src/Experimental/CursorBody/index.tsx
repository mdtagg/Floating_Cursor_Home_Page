
export type TCursorBody = {
    isMouseDown:boolean 
    color:string
}

const CursorBody = (props:TCursorBody) => {

    const { isMouseDown,color } = props
    const cursorStyle = isMouseDown ? "mouse-down" : "mouse-up"

    return (
        <div 
            id="cursor-takeover-body"
            className={`${cursorStyle}`}
            // style={{"color":`${color}`}}
        >
            {isMouseDown ? "" : "DRAG"}
        </div>
    )
}

export { CursorBody }