import { useEffect, useState } from 'react'

import Menu from './components/Menu'
import NavBar from './components/NavBar'
import Counter from './pages/Counter'
import Countries from './pages/Countries'

function App() {
  const [page, setPage] = useState('counter')

  const propsMenu = {page, setPage}

  useEffect(() => {
    console.log('page: ', page)
  }, [page])

  return (
    <div className="container">
      <div className="row">
        {/** navbar */}
        <div className="col-12 mb-3">
          <NavBar />
        </div>

        {/** menu */}
        <div className="col-12 col-md-3">
          <Menu {...propsMenu}/>
        </div>

        {/** content */}
        <div className="col-12 col-md-9">
          { page == 'counter' && 
            <Counter initialNumber={1}/>
          }

          { page == 'countries' &&
            <Countries />
          }
        </div>
      </div>
    </div>
  )
}

export default App
