import React, { useState, useEffect } from 'react'
import Map from './components/Map'
import Menu from './components/Menu'
import TradeBalanceChart from './components/TradeBalanceChart'
import ExportsChart from './components/ExportsChart'
import ImportsChart from './components/ImportsChart'
import dataService from './services/DataService'
import CircularProgress from '@material-ui/core/CircularProgress'
import Navbar from 'react-bootstrap/Navbar'

const App = () => {

  const [imports, setImports] = useState([])
  const [exports, setExports] = useState([])
  const [tradeBalance, setTradeBalance] = useState([])

  const [importsSITC, setImportsSITC] = useState([])
  const [exportsSITC, setExportsSITC] = useState([])

  const [flow, setFlow] = useState('exports')
  const [year, setYear] = useState(2018)

  useEffect(() => {
    dataService.getImports().then(res => {
      console.log(res.data)
      setImports(res.data)
    })
    dataService.getExports().then(res => {
      console.log(res.data)
      setExports(res.data)
    })
    dataService.getTradeBalance().then(res => {
      console.log(res.data)
      setTradeBalance(res.data)
    })
    dataService.getImportsBySITC().then(res => {
      console.log(res.data)
      setImportsSITC(res.data)
    })
    dataService.getExportsBySITC().then(res => {
      console.log(res.data)
      setExportsSITC(res.data)
    })
  }, [])

  return (
    <div>
      <Navbar bg="dark" variant='dark' expand="lg">
        <Navbar.Brand href="#">Finnish Foreign Trade Visualized</Navbar.Brand>
      </Navbar>
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
      {(imports.length > 0 && exports.length > 0) &&
        <div>
          {(tradeBalance.length > 0) &&
            <TradeBalanceChart tradeBalance={tradeBalance} />
          }
          {(exportsSITC.length > 0) &&
            <ExportsChart exports={exportsSITC} />
          }
          {(importsSITC.length > 0) &&
            <ImportsChart imports={importsSITC} />
          }
        </div>
      }
    </div>
  )
}

export default App
