import { Landing } from './Components/Landing'
import { Carousel } from './Components/Carousel'
import { CursorTakeover } from './Components/CursorTakeover'
import { CustomCursor } from './Components/CustomCursor'
import { NavBar } from './Components/NavBar'
import { NavModal } from './Components/NavModal'
import { ProgressBar } from './Components/ProgressBar'
import { CompanyContent } from './Components/CompanyContent'
import { useState } from 'react'
import './index.css'

function App() {

  const [ modalToggle,setModalToggle ] = useState(false)

  return (
    <>
      <div className="bg"></div>

      <main>
        <NavBar
          setModalToggle={setModalToggle}
        />
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
          <Carousel
            ProgressBar={ProgressBar}
          >
              <CompanyContent/>
          </Carousel>
        </CursorTakeover> 
        
        {modalToggle &&
        <NavModal
          setModalToggle={setModalToggle}
        />}
      </main>
      <div style={{"height":"500px"}}></div>
      
    </>
  )
}

export default App
