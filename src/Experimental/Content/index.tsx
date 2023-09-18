import { forwardRef,useEffect,useRef } from 'react'
import CursorBody from '../CursorBody'
import { TCoords } from '../../components/Carousel'

type TCursor = {
    setCursorEvent:React.Dispatch<React.SetStateAction<React.MouseEvent<HTMLDivElement, MouseEvent> | null>>
    cursorCoords: TCoords
}

    
const Content = ({setCursorEvent,cursorCoords,cursorOuter}:TCursor) => {

    return (
        <div 
            style={{
                "height":"500px",
                "border":"1px solid black",
                "width":"100vw"
            }} 
            onMouseMove={(e) => setCursorEvent(e)}
        >
            <CursorBody
                cursorCoords={cursorCoords}
                cursorOuter={cursorOuter}
            />
        </div>
        )
}

export default Content

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