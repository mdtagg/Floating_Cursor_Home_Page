import { Landing } from './Experimental/Landing'
import { Carousel } from './Experimental/Carousel'
import { CursorWrapper } from './Experimental/CursorWrapper'
import { CustomCursor } from './Experimental/CustomCursor'
import './index.css'

function App() {

  return (
    <>
      <div className="bg"></div>

      <main>
        
        {/* <CursorWrapper
          CustomCursor={CustomCursor}
        >
          <Landing/>
        <ContentWrapper/> */}
        <CursorWrapper
          CustomCursor={CustomCursor}
        >
          <Landing/>
        </CursorWrapper>

        <CursorWrapper
          CustomCursor={CustomCursor}
        >
          <Carousel/>
        </CursorWrapper>
        
        {/* <CursorWrapper
          Content={Carousel}
          CustomCursor={CustomCursor}
        /> */}
        
      </main>
      <div style={{"height":"500px"}}></div>
      
    </>
  )
}

export default App
