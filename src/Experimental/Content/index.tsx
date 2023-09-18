import { forwardRef,useEffect,useRef,useState } from 'react'
import CursorBody from '../CursorBody'
import { TCoords } from '../../components/Carousel'
import "./index.css"

type TCursor = {
    setCursorEvent:React.Dispatch<React.SetStateAction<React.MouseEvent<HTMLDivElement, MouseEvent> | null>>
    cursorCoords: TCoords
}

    
const Content = (props:TCursor) => {

    const { cursorCoords,cursorOuter,setCursorCoords } = props
    const [ cursorEvent,setCursorEvent ] = useState<null | React.MouseEvent<HTMLDivElement, MouseEvent>>(null)

    return (
        <div 
            className="content-test"
            onMouseMove={(e) => setCursorEvent(e)}
        >
            <CursorBody
                cursorEvent={cursorEvent}
            />
        </div>
        )
}

export default Content

//

// interface TContent {
    //     setRefState: React.Dispatch<React.SetStateAction<React.SyntheticEvent<Element, Event> | null>>
    // }

    // type Tref = React.MutableRefObject<React.SyntheticEvent | null>

    // const Content = forwardRef<Tref,TContent>(function Content(props,ref) {

// const {setRefState} = props

    // const firstElement = useRef(null)

    // function handleMove(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
    //     if(ref) {
    //         // @ts-expect-error
    //         ref.current = e
    //     }
    // }

    // useEffect(() => {
    //     ref.current! = {
    //         event:null,
    //         element: firstElement.current
    //     }
    // },[])