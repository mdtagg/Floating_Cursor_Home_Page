import { Icon } from '@iconify/react';
import "./index.css"

interface TCursor {
    cursorContainer: React.MutableRefObject<HTMLDivElement | null>
    cursorOuter: React.MutableRefObject<HTMLDivElement | null>
    cursor: React.MutableRefObject<HTMLDivElement | null>
    carets:boolean
}

const Cursor = (props:TCursor) => {

    const { cursorContainer,cursorOuter,cursor,carets } = props

    return (
        <div 
            className="cursor-takeover-container"
            ref={cursorContainer}
        >
            <div className="cursor-takeover-outer" ref={cursorOuter}>
                {carets && <Icon icon="bx:caret-left" className="caret" />}
                <div className="cursor-takeover-cursor" ref={cursor}>
                    <span>DRAG</span>
                </div>
                {carets && <Icon icon="bx:caret-right" className="caret"/>}
            </div>
        </div>
    )
}

export default Cursor