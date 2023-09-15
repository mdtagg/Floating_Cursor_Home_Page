
import Carosel from './Carosel'
import { CaroselContent } from './libs'
import { ProgressBar } from './libs'
import { Cursor } from './libs'

function App() {

  return (
    <>
      <main id="main">
        
        <div className="bg"></div>
        <Carosel
          CaroselContent={() => <div className="landing"></div>}
          Cursor={Cursor}
          color="white"
        />
        
        <h2 className="title">FEATURED ENGAGEMENTS</h2>
        <Carosel
          CaroselContent={CaroselContent}
          ProgressBar={ProgressBar}
          Cursor={Cursor}
        />
      </main>
      <div style={{"height":"500px"}}></div>
    </>
  )
}

export default App
