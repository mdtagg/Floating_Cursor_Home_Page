import './index.css'

export type TCursorBody = {
    isMouseDown:boolean 
    color:string
    isAnchorHover?:boolean
    text:string
}

const CursorBody = (props:TCursorBody) => {

    const { isMouseDown, color, isAnchorHover, text } = props
    const cursorStyle = isMouseDown ? "mouse-down" : "mouse-up"
    const cursorVisibility = isAnchorHover ? "anchor-hover" : ""

    const words = text.split(' ')

    return (
        <div 
            id="cursor-takeover-body"
            className={`${cursorStyle} ${cursorVisibility}`}
            style={{"backgroundColor":`${color}`}}
            
        >
            { 
            isMouseDown || isAnchorHover ? 
            "" : 
            words.map(word => <span>{word}</span>)
            }
        </div>
    )
}

export { CursorBody }