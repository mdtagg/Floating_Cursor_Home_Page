import { TCoords } from "../../components/Carousel"

type TCursorBody = {
    cursorCoords:TCoords
}

const CursorBody = ({cursorCoords,cursorOuter}:TCursorBody) => {
    return (
        <div style={{
            "height":"100%",
            "width":"100%",
            "border":"1px solid black",
            "pointerEvents":"none",
            "display":"flex",
            "justifyContent":"flex-end",
            "alignItems":"center",
        }}>

        
        <div 
            ref={cursorOuter}
            style={{
                "height":"160px",
                "width":"160px",
                "border":"1px solid black",
                "display":"flex",
                "alignItems":"center",
                "justifyContent":"center",
                "position":"absolute",
                "marginRight":"4rem"
            }}
        >

            <div 
                className={`cursor-takeover-cursor`} 
                style={{
                    "backgroundColor":`pink`,
                    "height":"120px",
                    "width":"120px",
                    // "transform":`translate(${cursorCoords.x}px,${cursorCoords.y}px)`
                }}
                
            >
                DRAG
            </div>
        </div>
        </div>
    )
}

export default CursorBody