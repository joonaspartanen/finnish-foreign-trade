import React, { useState, useEffect } from 'react';
import Map from './components/Map'
import dataService from './services/DataService'

const App = () => {

  const [imports, setImports] = useState([])

  useEffect(() => {
    dataService.getImports().then(initialImports => {
      //console.log(initialImports)
      setImports(dataService.mapData(initialImports.data))
      console.log(dataService.mapData(initialImports.data))
    })
  }, [])

  //console.log(imports)


  return (
    <div>
      <h1>Finnish Foreign Trade Visualized</h1>
      <Countries values={imports} />
    </div>
  )
}

const Countries = ({ values }) => {
  if (values.length === 0) {
    return null
  }

  return (
    <Map values={values} />
    // values.map(value => <div>{value.keys[1]} - {value.keys[3]} ({value.keys[2]}): {value.vals}</div>)
  )

}



export default App
