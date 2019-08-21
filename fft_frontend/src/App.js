import React, { useState, useEffect } from 'react'
import Map from './components/Map'
import Menu from './components/Menu'
import TradeBalanceChart from './components/TradeBalanceChart'
import ExportsChart from './components/ExportsChart'
import ImportsChart from './components/ImportsChart'
import ExportsBarChart from './components/ExportsBarChart'
import dataService from './services/DataService'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import ScrollableAnchor from 'react-scrollable-anchor'
import { configureAnchors } from 'react-scrollable-anchor'
import './App.css'

//configureAnchors({ offset: -50 })

const App = () => {

  const [imports, setImports] = useState([])
  const [exports, setExports] = useState([])
  const [tradeBalance, setTradeBalance] = useState([])

  const [importsSITC, setImportsSITC] = useState([])
  const [exportsSITC, setExportsSITC] = useState([])

  const [flow, setFlow] = useState('exports')

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

  console.log('Flow: ', flow)
  return (
    <div style={{ backgroundColor: '#343A40' }}>
      <Container fluid={'true'} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Navbar bg='dark' variant='dark' expand='lg' style={{ marginLeft: 0, marginRight: 0 }} >
          <Navbar.Brand href='#'>Finnish Foreign Trade Visualized</Navbar.Brand>
        </Navbar>
        {(imports.length > 0 && exports.length > 0) &&
          <div>
            <div className='section' style={{ position: 'relative', height: 'calc(100vh - 50px)' }}>
              <Map
                imports={imports}
                exports={exports}
                flow={flow}
              />
              <a href='#trade-balance' style={{ position: 'absolute', bottom: '2em' }}>
                <div className='arrow-down' ></div>
              </a>
            </div>

            <ScrollableAnchor id={'trade-balance'}>
              <div className='section' style={{ height: '100vh', backgroundColor: '#555', position: 'relative', padding: '0 0 3em 0' }}>
                <TradeBalanceChart tradeBalance={tradeBalance} />
                <a href='#by-product' style={{ position: 'absolute', bottom: '2em' }}>
                  <div className='arrow-down'></div>
                </a>
              </div>
            </ScrollableAnchor>

            <ScrollableAnchor id={'by-product'}>
              <div className='section' style={{ height: '100vh', backgroundColor: '#333', position: 'relative', padding: '0 0 3em 0' }}>
                <ExportsBarChart exports={exportsSITC} />
              </div>
            </ScrollableAnchor>
          </div>
        }
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Nav className='mr-auto'>
            <Nav.Link href='#'>About</Nav.Link>
          </Nav>
        </Navbar>
      </Container>

    </div >
  )
}

export default App
