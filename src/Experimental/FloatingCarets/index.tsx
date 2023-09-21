import { Icon } from '@iconify/react';
import "./index.css"
import { CursorBody } from '../CursorBody';

type TFloatingCarets = {
    color:string
}

const FloatingCarets = (props:TFloatingCarets) => {

    const { color } = props

    return (
        <>
        
            <Icon 
                icon="bx:caret-left" 
                className="caret" 
            />
            <CursorBody
                isMouseDown={true}
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