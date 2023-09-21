import { Icon } from '@iconify/react';
import "./index.css"
import { CursorBody } from '../CursorBody';

type TFloatingCarets = {
    color:string
    isAnchorHover:boolean
}

const FloatingCarets = (props:TFloatingCarets) => {

    const { color,isAnchorHover } = props

    return (
        <>
        
            <Icon 
                icon="bx:caret-left" 
                className="caret" 
            />
            <CursorBody
                isMouseDown={true}
                color={color}
                isAnchorHover={isAnchorHover}
            />
            <Icon 
                icon="bx:caret-right" 
                className="caret"
            />
                
        </>
    )
}

export default FloatingCarets