import "./index.css"
import FloatingCarets from "../FloatingCarets"
import { CursorBody } from "../CursorBody"

interface TCursorBody {
    isMouseDown?:boolean
    isAnchorHover?:boolean
    color:string
    text:string
}

const CustomCursor = (props:TCursorBody) => {

    const { isMouseDown, isAnchorHover, color, text } = props

    return (
        <>
    
        {isMouseDown ?

            <FloatingCarets>
                <CursorBody
                    isMouseDown={isMouseDown}
                    isAnchorHover={isAnchorHover}
                    color={color}
                    text={text}
                />
            </FloatingCarets>

            :

            <CursorBody
                isMouseDown={false}
                color={color}
                isAnchorHover={isAnchorHover}
                text={text}
            />}
        
        </>
    )
}

export { CustomCursor }