import "./index.css"
import { CarouselProps } from "../Carousel"

const Landing = (props:CarouselProps) => {

    const { setCursorEvent } = props

    function handleEvent(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if(setCursorEvent) {
            setCursorEvent(e)
        }
    }

    return (
        <img 
            className="landing"
            src="src\assets\pexels-eberhard-grossgasteiger-673018.jpg"
            onMouseMove={(e) => handleEvent(e)}
            onMouseLeave={(e) => handleEvent(e)}
        >

            </img>
    )
}

export { Landing }