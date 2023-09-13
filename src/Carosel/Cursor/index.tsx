import { Icon } from '@iconify/react';
import "./index.css"

interface TCursor {
    cursorContainer: React.MutableRefObject<HTMLDivElement | null>
    cursorOuter: React.MutableRefObject<HTMLDivElement | null>
    isMouseDown:boolean
    isHover:boolean
}

const Cursor = (props:TCursor) => {

    const { cursorContainer,cursorOuter,isMouseDown,isHover } = props
    const mouseStyle = isMouseDown ? "mouse-down" : "mouse-up"
    const hoverStyle = isHover ? "hoverStyle" : ""

    return (
        <div 
            className="cursor-takeover-container"
            ref={cursorContainer}
        >
            <div 
                className="cursor-takeover-outer" 
                ref={cursorOuter}
            >
                {isMouseDown && 
                    <Icon 
                        icon="bx:caret-left" 
                        className="caret" 
                    />
                }
                <div 
                    className={`cursor-takeover-cursor ${mouseStyle} ${hoverStyle}`} 
                >
                    {isMouseDown || isHover ? "" : "DRAG"}
                </div>
                {isMouseDown && 
                    <Icon 
                        icon="bx:caret-right" 
                        className="caret"
                    />
                    }
            </div>
        </div>
    )
}

export default Cursor