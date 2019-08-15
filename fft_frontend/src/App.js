import React, { useState, useEffect } from 'react'
import Map from './components/Map'
import Menu from './components/Menu'
import dataService from './services/DataService'

const App = () => {

  const [imports, setImports] = useState([])
  const [exports, setExports] = useState([])
  const [showImports, setShowImports] = useState(false)

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

  //console.log(imports)

  return (
    <div>
      <Menu
        showImports={showImports}
        setShowImports={setShowImports} />

      {(imports.length === 0 && exports.length === 0) && <div>Loading...</div>}

      {(imports.length > 0 && exports.length > 0) &&
        <Map
          imports={imports}
          exports={exports}
          showImports={showImports} />
      }
    </div>
  )
}

export default App
