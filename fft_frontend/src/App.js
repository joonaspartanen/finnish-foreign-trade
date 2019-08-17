import React, { useState, useEffect } from 'react'
import Map from './components/Map'
import Menu from './components/Menu'
import TradeBalanceChart from './components/TradeBalanceChart'
import dataService from './services/DataService'
import CircularProgress from '@material-ui/core/CircularProgress';

const App = () => {

  const [imports, setImports] = useState([])
  const [exports, setExports] = useState([])
  const [tradeBalance, setTradeBalance] = useState([])


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
      <TradeBalanceChart tradeBalance={tradeBalance} />
    </div>
  )
}

export default App
