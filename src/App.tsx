import { Landing } from './Experimental/Landing'
import { Carousel } from './Experimental/Carousel'
import { CursorWrapper } from './Experimental/CursorWrapper'
import './index.css'

function App() {

  return (
    <>
      <main id="main">
        
        <div className="bg"></div>
        {/* <div className="landing"></div> */}
        <CursorWrapper
          Content={Landing}
        />
        <CursorWrapper
          Content={Carousel}
        />
          
      </main>
      <div style={{"height":"500px"}}></div>
    </>
  )
}

export default App

{/* <Carousel
          CaroselContent={() => <div className="landing"></div>}
          Cursor={Cursor}
          color="white"
        />
        
        <h2 className="title">FEATURED ENGAGEMENTS</h2>
        <Carousel
          CaroselContent={CarouselContent}
          ProgressBar={ProgressBar}
          Cursor={Cursor}
        /> */}
        {/* <Content/> */}
        {/* <Carousel/> */}
