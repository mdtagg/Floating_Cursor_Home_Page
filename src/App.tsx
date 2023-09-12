
import Carosel from './Carosel'

function App() {

  return (
    <>
      <main id="main">
        <div style={{"height":"200px"}}></div>
        <div className="bg"></div>
        <h2 className="title">FEATURED ENGAGEMENTS</h2>
        <Carosel/>
      </main>
      <div style={{"height":"500px"}}></div>
    </>
  )
}

export default App
