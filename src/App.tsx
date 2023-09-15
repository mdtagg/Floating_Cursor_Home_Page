
import Carousel from './components/Carousel'
import { CarouselContent } from './libs'
import { ProgressBar } from './libs'
import { Cursor } from './libs'
import CursorWrapper from './Experimental/CursorWrapper'

function App() {

  return (
    <>
      <main id="main">
        
        <div className="bg"></div>
        <Carousel
          CaroselContent={() => <div className="landing"></div>}
          Cursor={Cursor}
          color="white"
        />
        
        <h2 className="title">FEATURED ENGAGEMENTS</h2>
        <Carousel
          CaroselContent={CarouselContent}
          ProgressBar={ProgressBar}
          Cursor={Cursor}
        />
        {/* <CursorWrapper/> */}

      </main>
      <div style={{"height":"500px"}}></div>
    </>
  )
}

export default App
