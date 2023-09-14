import "./index.css"
import { TCoords } from '..';
import CursorBody from '../CursorBody';
import FloatingCarets from '../FloatingCarets';

export interface TCursorStyles {
    isMouseDown:boolean 
    isAnchorHover:boolean
}

interface TCursor {
    cursorOuter: React.MutableRefObject<HTMLDivElement | null>
    isMouseDown:boolean
    isAnchorHover:boolean
    cursorCoords:TCoords
}

const Cursor = (props:TCursor) => {

    const { cursorOuter,isMouseDown,isAnchorHover,cursorCoords } = props
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
                {isMouseDown ?
                    <FloatingCarets
                        isMouseDown={isMouseDown} 
                        isAnchorHover={isAnchorHover}
                    /> :
                    <CursorBody
                        isMouseDown={isMouseDown} 
                        isAnchorHover={isAnchorHover}
                    />
                }
            </div>
        </div>
    )
}

export default Cursor