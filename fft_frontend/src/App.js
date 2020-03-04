import React, { useState, useEffect } from 'react'
import './App.css'
import Map from './components/Map/Map'
import FlowButtons from './components/FlowButtons/FlowButtons'
import TradeBalanceChart from './components/TradeBalanceChart/TradeBalanceChart'
import ProductsTreeMap from './components/ProductsTreeMap/ProductsTreeMap'
import CountryData from './components/CountryData/CountryData'
import CountrySearch from './components/CountryData/CountrySearch'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'

import dataService from './services/dataService'
import { Container, Loader } from 'semantic-ui-react'

import ScrollableAnchor from 'react-scrollable-anchor'

//configureAnchors({ offset: -50 })

const App = () => {
  const [imports, setImports] = useState([])
  const [exports, setExports] = useState([])
  const [tradeBalance, setTradeBalance] = useState([])
  const [importsSITC2, setImportsSITC2] = useState([])
  const [exportsSITC2, setExportsSITC2] = useState([])
  const [flow, setFlow] = useState('exports')
  const [country, setCountry] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const [countryCodes, setCountryCodes] = useState([])

  const handleCountryFilterChange = countryName => {
    setCountryFilter(countryName)
    const country = countryCodes.filter(c => c.name === countryName)
    setCountry(country)
  }

  useEffect(() => {
    dataService.getImports().then(res => {
      setImports(res.data)
    })
    dataService.getExports().then(res => {
      setExports(res.data)
    })
    dataService.getTradeBalance().then(res => {
      setTradeBalance(res.data)
    })
    dataService.getSITC2Data('imports').then(res => {
      setImportsSITC2(res.data)
    })
    dataService.getSITC2Data('exports').then(res => {
      setExportsSITC2(res.data)
    })
    dataService.getCountryCodes().then(res => {
      setCountryCodes(res.data)
    })
  }, [])

  console.log('Flow: ', flow)
  return (
    <div style={{ backgroundColor: '#333', paddingLeft: 0, paddingRight: 0 }}>
      <Container fluid>
        <NavBar />
        {(imports.length === 0 || exports.length === 0) && (
          <div style={{ height: '100vh' }}>
            <Loader active />
          </div>
        )}
        {imports.length > 0 && exports.length > 0 && (
          <div>
            <ScrollableAnchor id={'trade-map'}>
              <div
                className='section'
                style={{
                  position: 'relative',
                  height: 'calc(100vh - 60px)',
                  backgroundColor: '#333'
                }}>
                <Map imports={imports} exports={exports} flow={flow} />
                <FlowButtons setFlow={setFlow} />
                <a href='#trade-balance' style={{ position: 'absolute', bottom: '2em' }}>
                  <div className='arrow-down'></div>
                </a>
              </div>
            </ScrollableAnchor>
            <ScrollableAnchor id={'trade-balance'}>
              <div
                className='section'
                style={{
                  height: '100vh',
                  backgroundColor: '#333',
                  position: 'relative',
                  padding: '0 0 4em 0'
                }}>
                <TradeBalanceChart tradeBalance={tradeBalance} />
                <a href='#imports-by-product' style={{ position: 'absolute', bottom: '2em' }}>
                  <div className='arrow-down'></div>
                </a>
              </div>
            </ScrollableAnchor>
            <ScrollableAnchor id={'imports-by-product'}>
              <div
                className='section'
                style={{
                  height: '100vh',
                  backgroundColor: '#222',
                  position: 'relative',
                  padding: '0 0 3em 0'
                }}>
                <ProductsTreeMap SITC2Data={importsSITC2} flow={'imports'} />
                <a href='#exports-by-product' style={{ position: 'absolute', bottom: '2em' }}>
                  <div className='arrow-down'></div>
                </a>
              </div>
            </ScrollableAnchor>
            <ScrollableAnchor id={'exports-by-product'}>
              <div
                className='section'
                style={{
                  height: '100vh',
                  backgroundColor: '#333',
                  position: 'relative',
                  padding: '0 0 3em 0'
                }}>
                <ProductsTreeMap SITC2Data={exportsSITC2} flow={'exports'} />
                <a href='#trade-partners' style={{ position: 'absolute', bottom: '2em' }}>
                  <div className='arrow-down'></div>
                </a>
              </div>
            </ScrollableAnchor>
            <ScrollableAnchor id={'trade-partners'}>
              <div
                className='section'
                style={{
                  minHeight: 'calc(100vh - 40px)',
                  backgroundColor: '#222',
                  position: 'relative',
                  padding: '0 0 3em 0'
                }}>
                {country.length === 0 && (
                  <CountrySearch
                    countryFilter={countryFilter}
                    handleCountryFilterChange={handleCountryFilterChange}
                    countryNames={countryCodes.map(c => ({
                      title: c.name,
                      key: c.code
                    }))}></CountrySearch>
                )}
                {country.length !== 0 && (
                  <CountryData
                    country={country}
                    setCountry={setCountry}
                    setCountryFilter={setCountryFilter}></CountryData>
                )}
              </div>
            </ScrollableAnchor>
          </div>
        )}
        <Footer></Footer>
      </Container>
    </div>
  )
}

export default App
