import { Landing } from './Experimental/Landing'
import { Carousel } from './Experimental/Carousel'
import { CursorTakeover } from './Experimental/CursorTakeover'
import { CustomCursor } from './Experimental/CustomCursor'
import './index.css'

function App() {

  return (
    <>
      <div className="bg"></div>

      <main>

        <CursorTakeover
          CustomCursor={CustomCursor}
          color='white'
        >
          <Landing/>
        </CursorTakeover>

        <CursorTakeover
          CustomCursor={CustomCursor}
          color="pink"
        >
          <Carousel/>
        </CursorTakeover>
        
      </main>
      <div style={{"height":"500px"}}></div>
      
    </>
  )
}

export default App
