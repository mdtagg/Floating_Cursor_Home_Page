import { Landing } from './Components/Landing'
import { Carousel } from './Components/Carousel'
import { CursorTakeover } from './Components/CursorTakeover'
import { CustomCursor } from './Components/CustomCursor'
import { NavBar } from './Components/NavBar'
import { NavMenu } from './Components/NavMenu'
import { ProgressBar } from './Components/ProgressBar'
import { CompanyContent } from './Components/CompanyContent'
import { useState,useRef,useEffect } from 'react'
import './index.css'

function App() {


  const [ menuToggle, setMenuToggle ] = useState(false)
  const [ splashPage, setSplashPage ] = useState(true)
  const title = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setTimeout(() => {
      title.current!.style.maxHeight = "0"
    },300)
  },[])

  return (
    <>
      <div className="bg"></div>
      
      {splashPage &&
      <div
        className="splash-page"
      >
          
        <div 
          className="splash-container"
        >
          <div 
            className="splash-title"
            ref={title}
            onTransitionEnd={() => setSplashPage(false)}
          >
            COMPANY <br/> TITLE
          </div>
        </div>
          
      </div> 
      }

      {!splashPage && 
      <main>
        <NavBar
          setMenuToggle={setMenuToggle}
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

        {menuToggle &&
        <NavMenu
          setMenuToggle={setMenuToggle}
        />}

      </main>
}
      <div style={{"height":"500px"}}></div>
    </>
  )
}

export default App
