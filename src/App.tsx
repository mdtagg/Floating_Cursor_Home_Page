import { Landing } from './Components/Landing'
import { Carousel } from './Components/Carousel'
import { CursorTakeover } from './Components/CursorTakeover'
import { CustomCursor } from './Components/CustomCursor'
import { NavBar } from './Components/NavBar'
import './index.css'

function App() {

  return (
    <>
      <div className="bg"></div>

      <main>
        <NavBar/>
        <CursorTakeover
          CustomCursor={CustomCursor}
          color='white'
          position='center'
          text="WATCH REEL"
        >
          <Landing/>
        </CursorTakeover>

        <CursorTakeover
          CustomCursor={CustomCursor}
          color="#f9cdcd"
          position='right'
          text='DRAG'
        >
          <Carousel/>
        </CursorTakeover>
        
      </main>
      <div style={{"height":"500px"}}></div>
      
    </>
  )
}

export default App
