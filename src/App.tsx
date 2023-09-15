
import Carosel from './Carosel'
import CaroselContent from './libs'

function App() {

  return (
    <>
      <main id="main">
        <div 
          className="landing"
        >
          <Carosel
            // CaroselContent={() => <div></div>}
          />
        </div>
        <div className="bg"></div>
        <h2 className="title">FEATURED ENGAGEMENTS</h2>
        <Carosel
          CaroselContent={CaroselContent}
        />
      </main>
      <div style={{"height":"500px"}}></div>
    </>
  )
}

export default App
