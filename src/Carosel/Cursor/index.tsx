import { Icon } from '@iconify/react';
import "./index.css"

interface TCursor {
    cursorContainer: React.MutableRefObject<HTMLDivElement | null>
    cursorOuter: React.MutableRefObject<HTMLDivElement | null>
    cursor: React.MutableRefObject<HTMLDivElement | null>
    isMouseDown:boolean
}

const Cursor = (props:TCursor) => {

    const { cursorContainer,cursorOuter,cursor,isMouseDown } = props
    const mouseStyle = isMouseDown ? "mouse-down" : "mouse-up"

    return (
        <div 
            className="cursor-takeover-container"
            ref={cursorContainer}
        >
            <div className="cursor-takeover-outer" ref={cursorOuter}>
                {isMouseDown && <Icon icon="bx:caret-left" className="caret" />}
                <div className={`cursor-takeover-cursor ${mouseStyle}`} ref={cursor}>
                    {isMouseDown ? "" : "DRAG"}
                </div>
                {isMouseDown && <Icon icon="bx:caret-right" className="caret"/>}
            </div>
        </div>
    )
}

export default Cursor