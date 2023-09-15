import "./index.css"
import { TCoords } from '..';
import CursorBody from '../CursorBody';
import FloatingCarets from '../FloatingCarets';

export interface TCursorStyles {
    isMouseDown:boolean 
    isAnchorHover:boolean
    color:string | undefined
}

export interface TCursor {
    cursorOuter: React.MutableRefObject<HTMLDivElement | null>
    isMouseDown:boolean
    isAnchorHover:boolean
    cursorCoords:TCoords
    color:string | undefined
}

const Cursor = (props:TCursor) => {

    const { cursorOuter,isMouseDown,isAnchorHover,cursorCoords,color } = props
    const cursorPosition = {
        transform:`translate(${cursorCoords.x}px,${cursorCoords.y}px)`,
        transition: cursorCoords.transition
    }

    return (
        <div 
            className="cursor-takeover-container right-floating"
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
                        color={color}
                    /> :
                    <CursorBody
                        isMouseDown={isMouseDown} 
                        isAnchorHover={isAnchorHover}
                        color={color}
                    />
                }
            </div>
        </div>
    )
}

export default Cursor