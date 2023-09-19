import { useState } from 'react'
import { FloatingCursor } from '../CursorBody'
import "./index.css"

    
const Content = () => {

    const [ cursorEvent,setCursorEvent ] = useState<null | React.MouseEvent<HTMLDivElement, MouseEvent>>(null)

    return (
        <div 
            className="content-test"
            onMouseMove={(e) => setCursorEvent(e)}
            onMouseLeave={(e) => setCursorEvent(e)}
        >
            <FloatingCursor
                cursorEvent={cursorEvent}
            />
        </div>
        )
}

export default Content