import "./index.css"
import FloatingCarets from "../FloatingCarets"
import { CursorBody } from "../CursorBody"

interface TCursorBody {
    isMouseDown?:boolean
    isAnchorHover?:boolean
    color:string
}

const CustomCursor = (props:TCursorBody) => {

    const { isMouseDown, isAnchorHover,color } = props

    return (
        <>
    
        {isMouseDown ?

            <FloatingCarets>
                <CursorBody
                    isMouseDown={isMouseDown}
                    isAnchorHover={isAnchorHover}
                    color={color}
                />
            </FloatingCarets>

            :

            <CursorBody
                isMouseDown={false}
                color={color}
                isAnchorHover={isAnchorHover}
            />}
        
        </>
    )
}

export { CustomCursor }