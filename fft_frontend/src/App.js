import React, { useState, useEffect } from 'react'
import Map from './components/Map'
import Menu from './components/Menu'
import dataService from './services/DataService'
import CircularProgress from '@material-ui/core/CircularProgress';

const App = () => {

  const [imports, setImports] = useState([])
  const [exports, setExports] = useState([])
  const [flow, setFlow] = useState('exports')
  const [year, setYear] = useState(2018)

  useEffect(() => {
    dataService.getImports().then(initialImports => {
      console.log(initialImports.data)
      setImports(initialImports.data)
    })
    dataService.getExports().then(initialExports => {
      console.log(initialExports.data)
      setExports(initialExports.data)
    })
  }, [])

  console.log(year)
  return (
    <div>
      <Menu
        setYear={setYear}
        flow={flow}
        setFlow={setFlow} />

      {(imports.length === 0 && exports.length === 0)
        && <CircularProgress></CircularProgress>}

      {(imports.length > 0 && exports.length > 0) &&
        <Map
          imports={imports}
          exports={exports}
          flow={flow}
          year={year} />
      }
    </div>
  )
}

export default App
