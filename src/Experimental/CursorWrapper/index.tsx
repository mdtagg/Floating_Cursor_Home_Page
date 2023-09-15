import { useRef,useEffect,useState } from 'react'
import Content from "../Content"

const CursorWrapper = () => {

    const ref = useRef(null)
    const [ refState,setRefState ] = useState<React.MutableRefObject<null | React.SyntheticEvent>>(ref)
    console.log({refState})
    
    useEffect(() => {
        console.log(ref)
    },[refState])

    return (
        
        <div style={{"position":"relative","display":"flex","height":"100%"}}>
            <Content setRefState={setRefState} ref={ref}/>
        </div>
        
    )
}

export default CursorWrapper

//get ref onto first element in component
//get event functions into first element in content
