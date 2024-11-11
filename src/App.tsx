import './App.css'

import Contador from './Contador'
import Countries from './Countries'

function App() {

  return (
    <>
      <Contador initialNumber={1}/>
      <hr/>
      <Countries />
      <hr/>
    </>
  )
}

export default App
