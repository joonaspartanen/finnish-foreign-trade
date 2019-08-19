import React, { useState, useEffect } from 'react'
import Map from './components/Map'
import Menu from './components/Menu'
import TradeBalanceChart from './components/TradeBalanceChart'
import ExportsChart from './components/ExportsChart'
import ImportsChart from './components/ImportsChart'
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

configureAnchors({ offset: -50 })

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

  console.log('Flow: ', flow)
  return (
    <div style={{ backgroundColor: '#FFF' }}>
      <Navbar bg='dark' variant='dark' expand='lg' fixed='top'>
        <Navbar.Brand href='#'>Finnish Foreign Trade Visualized</Navbar.Brand>
      </Navbar>
      <Container>
        {(imports.length === 0 || exports.length === 0) &&
          <Row className='justify-content-center align-items-center' style={{ height: '100vh' }}>
            <Spinner animation='border' role='status'>
              <span className='sr-only'>Loading...</span>
            </Spinner>
          </Row>
        }
        {(imports.length > 0 && exports.length > 0) &&
          <div>
            <Row className='justify-content-center' style={{ height: '100vh' }}>
              <Col>
                <h2 className='text-center display-5' style={{ padding: '0.5em 0 0.5em 0' }}>
                  Trade Partners (2018)
                </h2>
                <Map
                  imports={imports}
                  exports={exports}
                  flow={flow}
                  year={year}
                />
                <Menu
                  setYear={setYear}
                  flow={flow}
                  setFlow={setFlow}
                />
                <Row className='justify-content-center'>
                  <a href='#trade-balance'>
                    <div className='arrow-down'></div>
                  </a>
                </Row>
              </Col>
            </Row>
            <ScrollableAnchor id={'trade-balance'}>
              <Row>
                <Col>
                  <h2 className='text-center display-5' style={{ padding: '0.5em 0 0 0' }}>
                    Trade Balance (2009-2018)
                </h2>
                  {(tradeBalance.length > 0) &&
                    <TradeBalanceChart tradeBalance={tradeBalance} />
                  }
                </Col>
              </Row>
            </ScrollableAnchor>
            <Row className='justify-content-center'>
              <a href='#by-product'>
                <div className='arrow-down'></div>
              </a>
            </Row>
            <ScrollableAnchor id={'by-product'}>
              <Row style={{ height: '100vh' }}>
                <h2 className='text-center display-5' style={{ padding: '1em 0 0 0' }}>
                  Imports and Exports by Product Category (2018)
                </h2>
                <Col sm={6}>
                  {(exportsSITC.length > 0) &&
                    <ExportsChart exports={exportsSITC} />
                  }
                </Col>
                <Col sm={6}>
                  {(importsSITC.length > 0) &&
                    <ImportsChart imports={importsSITC} />
                  }
                </Col>
              </Row>
            </ScrollableAnchor>
          </div>
        }
      </Container>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Nav className='mr-auto'>
          <Nav.Link href='#'>About</Nav.Link>
        </Nav>
      </Navbar>
    </div>
  )
}

export default App
