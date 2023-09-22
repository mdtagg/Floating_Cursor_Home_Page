import "./index.css"
import FloatingCarets from "../FloatingCarets"
import { CursorBody } from "../CursorBody"

interface TCursorBody {
    isMouseDown?:boolean
    isAnchorHover?:boolean
}

const CustomCursor = (props:TCursorBody) => {

    const { isMouseDown, isAnchorHover } = props

    return (
        <>
    
        {isMouseDown ?

            <FloatingCarets>
                <CursorBody
                    isMouseDown={isMouseDown}
                    isAnchorHover={isAnchorHover}
                    color="white"
                />
            </FloatingCarets>

            :

            <CursorBody
                isMouseDown={false}
                color="pink"
                isAnchorHover={isAnchorHover}
            />}
        
        </>
    )
}

export { CustomCursor }