import React, { useState, useEffect } from 'react'
import Map from './components/Map'
import Menu from './components/Menu'
import TradeBalanceChart from './components/TradeBalanceChart'
import ExportsBarChart from './components/ExportsBarChart'
import dataService from './services/DataService'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import Spinner from 'react-bootstrap/Spinner'
import ScrollableAnchor from 'react-scrollable-anchor'
import { configureAnchors } from 'react-scrollable-anchor'
import './App.css'

//configureAnchors({ offset: -50 })

const App = () => {

  const [imports, setImports] = useState([])
  const [exports, setExports] = useState([])
  const [tradeBalance, setTradeBalance] = useState([])

  const [productData, setProductData] = useState([])

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
    dataService.getProductData().then(res => {
      console.log(res.data)
      setProductData(res.data)
    })
  }, [])

  console.log('Flow: ', flow)
  return (
    <div style={{ backgroundColor: '#343A40' }}>
      <Container fluid={'true'} style={{ paddingLeft: 0, paddingRight: 0 }}>
        <Navbar bg='dark' variant='dark' expand='md'  >
          <Navbar.Brand href='/'>Finnish Foreign Trade Visualized</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#trade-partners">Trade Partners</Nav.Link>
              <Nav.Link href="#trade-balance">Trade Balance</Nav.Link>
              <Nav.Link href="#by-product">Products</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        {(imports.length === 0 || exports.length === 0) &&
          <div className='section' style={{ height: '100vh' }}>
            <Spinner animation="border" variant="light" />
          </div>
        }
        {(imports.length > 0 && exports.length > 0) &&
          <div>
            <ScrollableAnchor id={'trade-partners'}>
              <div className='section' style={{ position: 'relative', height: 'calc(100vh - 50px)' }}>
                <Map
                  imports={imports}
                  exports={exports}
                  flow={flow}
                />
                <Menu setFlow={setFlow} />
                <a href='#trade-balance' style={{ position: 'absolute', bottom: '2em' }}>
                  <div className='arrow-down' ></div>
                </a>
              </div>
            </ScrollableAnchor>

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
                <ExportsBarChart productData={productData} />
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
