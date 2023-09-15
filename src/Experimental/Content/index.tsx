import { forwardRef } from 'react'
import CursorBody from '../CursorBody'


interface TContent {
    ref:React.MutableRefObject<null>
}


    const Content = forwardRef(function Content(props,ref) {

    const {setRefState} = props

    function handleMove(e:React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if(ref) {
            ref.current = e
        }
    }

    return (
        <div 
            style={{"height":"500px","border":"1px solid black","marginTop":"4rem","width":"100vw"}} 
            // ref={ref}
            onMouseMove={(e) => handleMove(e)}
        >
            <CursorBody/>
        </div>
    )
})

export default Content