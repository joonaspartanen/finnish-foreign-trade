import React, { useEffect, useState } from 'react'
import ScrollableAnchor from 'react-scrollable-anchor'
import { Container, Loader } from 'semantic-ui-react'
import './App.css'
import CountryDataWrapper from './components/CountryData/CountryDataWrapper'
import CountrySearch from './components/CountryData/CountrySearch'
import FlowButtons from './components/FlowButtons/FlowButtons'
import Footer from './components/Footer/Footer'
import Map from './components/Map/Map'
import NavBar from './components/NavBar/NavBar'
import TreeMapWrapper from './components/ProductsTreeMap/TreeMapWrapper'
import TradeBalanceChart from './components/TradeBalanceChart/TradeBalanceChart'
import dataService from './services/dataService'

//configureAnchors({ offset: -50 })

const App = () => {
  const [year, setYear] = useState(2019)
  const [imports, setImports] = useState([])
  const [exports, setExports] = useState([])
  const [tradeBalance, setTradeBalance] = useState([])
  const [sitc2Data, setSitc2Data] = useState({})
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
    dataService.getImports(year).then(res => {
      setImports(res.data)
    })
    dataService.getExports(year).then(res => {
      setExports(res.data)
    })
    dataService.getTradeBalance().then(res => {
      setTradeBalance(res.data)
    })
    dataService.getSitc2Data(year, 'total').then(res => {
      setSitc2Data(res.data)
    })
    dataService.getCountryCodes().then(res => {
      setCountryCodes(res.data)
    })
  }, [year])

  return (
    <div style={{ backgroundColor: '#333', paddingLeft: 0, paddingRight: 0 }}>
      <Container fluid>
        <NavBar year={year} setYear={setYear} />
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
                  backgroundColor: '#222',
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
                  backgroundColor: '#333',
                  position: 'relative',
                  padding: '0 0 3em 0'
                }}>
                <TreeMapWrapper sitc2Data={sitc2Data} />
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
                    }))}
                  />
                )}
                {country.length !== 0 && (
                  <CountryDataWrapper
                    country={country}
                    setCountry={setCountry}
                    setCountryFilter={setCountryFilter}
                    year={year}
                  />
                )}
              </div>
            </ScrollableAnchor>
          </div>
        )}
        <Footer />
      </Container>
    </div>
  )
}

export default App
