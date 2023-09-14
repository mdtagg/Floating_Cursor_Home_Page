import { Icon } from '@iconify/react';
import "./index.css"
import { TCoords } from '..';

interface TCursor {
    cursorOuter: React.MutableRefObject<HTMLDivElement | null>
    isMouseDown:boolean
    isAnchorHover:boolean
    cursorCoords:TCoords
}

const Cursor = (props:TCursor) => {

    const { cursorOuter,isMouseDown,isAnchorHover,cursorCoords } = props
    const mouseStyle = isMouseDown ? "mouse-down" : "mouse-up"
    const hoverStyle = isAnchorHover ? "hoverStyle" : ""
    const cursorPosition = {
        transform:`translate(${cursorCoords.x}px,${cursorCoords.y}px)`,
        transition: cursorCoords.transition
    }

    return (
        <div 
            className="cursor-takeover-container"
        >
            <div 
                className="cursor-takeover-outer" 
                ref={cursorOuter}
                style={cursorPosition}
            >
                {isMouseDown && 
                    <Icon 
                        icon="bx:caret-left" 
                        className="caret" 
                    />
                }
                <div 
                    className={`cursor-takeover-cursor ${mouseStyle} ${hoverStyle}`} 
                    style={{"border":"1px solid black"}}
                >
                    {isMouseDown || isAnchorHover ? "" : "DRAG"}
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