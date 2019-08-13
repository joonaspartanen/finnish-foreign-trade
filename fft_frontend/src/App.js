import React, { useState, useEffect } from 'react';
import Map from './components/Map'
import dataService from './services/DataService'

const App = () => {

  const [imports, setImports] = useState([])
  const [exports, setExports] = useState([])

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
      <Countries values={exports} />
    </div>
  )
}

const Countries = ({ values }) => {
  if (values.length === 0) {
    return null
  }

  return (
    <Map values={values} />
  )

}



export default App
