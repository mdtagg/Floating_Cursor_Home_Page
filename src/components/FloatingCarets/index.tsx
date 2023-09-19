import { Icon } from '@iconify/react';
import CursorBody from '../FloatingCursor';
import { TCursorStyles } from '../Cursor';
import "./index.css"

const FloatingCarets = (props:TCursorStyles) => {

    const { isMouseDown,isAnchorHover,color } = props

    return (
        <>
        
            <Icon 
                icon="bx:caret-left" 
                className="caret" 
            />
            <CursorBody
                isMouseDown={isMouseDown}
                isAnchorHover={isAnchorHover}
                color={color}
            />
            <Icon 
                icon="bx:caret-right" 
                className="caret"
            />
                
        </>
    )
}

export default FloatingCarets