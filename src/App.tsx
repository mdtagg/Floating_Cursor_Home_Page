import { Landing } from './Components/Landing'
import { Carousel } from './Components/Carousel'
import { CursorTakeover } from './Components/CursorTakeover'
import { CustomCursor } from './Components/CustomCursor'
import './index.css'

function App() {

  return (
    <>
      <div className="bg"></div>

      <main>

        <CursorTakeover
          CustomCursor={CustomCursor}
          color='white'
          position='center'
        >
          <Landing/>
        </CursorTakeover>

        <CursorTakeover
          CustomCursor={CustomCursor}
          color="pink"
          position='left'
        >
          <Carousel/>
        </CursorTakeover>
        
      </main>
      <div style={{"height":"500px"}}></div>
      
    </>
  )
}

export default App
