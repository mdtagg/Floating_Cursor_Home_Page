import { Icon } from '@iconify/react';
import "./index.css"

type TFloatingCarets = {
    children: JSX.Element
}

const FloatingCarets = (props:TFloatingCarets) => {

    const { children } = props

    return (
        <>
            <Icon 
                icon="bx:caret-left" 
                className="caret" 
            />
            {children}
            <Icon 
                icon="bx:caret-right" 
                className="caret"
            />
        </>
    )
}

export default FloatingCarets