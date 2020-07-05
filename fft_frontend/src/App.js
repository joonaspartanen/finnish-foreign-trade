import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import D3TradeBalanceChart from './components/TradeBalanceChart/D3TradeBalanceChart'
import { initializeTradeData } from './reducers/tradeDataReducer'
import { initializeCountryCodes } from './reducers/countryReducer'

const App = () => {
  const dispatch = useDispatch()

  const [year, setYear] = useState(2019)
  const [country, setCountry] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const handleCountryFilterChange = (countryName) => {
    setCountryFilter(countryName)
    const country = countryCodes.filter((c) => c.name === countryName)
    setCountry(country)
  }

  const state = useSelector((state) => state)
  const tradeData = state.tradeData
  const countryCodes = state.countryData.countryCodes

  useEffect(() => {
    dispatch(initializeTradeData(year))
    dispatch(initializeCountryCodes())
  }, [year, dispatch])

  return (
    <div style={{ backgroundColor: '#333', paddingLeft: 0, paddingRight: 0 }}>
      <Container fluid>
        <NavBar year={year} setYear={setYear} />
        {(tradeData.importsData === undefined || tradeData.exportsData === undefined) && (
          <div style={{ height: '100vh' }}>
            <Loader active />
          </div>
        )}
        <D3TradeBalanceChart tradeBalance={tradeData.tradeBalance}></D3TradeBalanceChart>
        {tradeData.importsData !== undefined && tradeData.exportsData !== undefined && (
          <div>
            <ScrollableAnchor id={'trade-map'}>
              <div
                className='section'
                style={{
                  position: 'relative',
                  height: 'calc(100vh - 60px)',
                  backgroundColor: '#333',
                }}>
                <Map tradeData={tradeData} />
                <FlowButtons />
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
                  padding: '0 0 4em 0',
                }}>
                <TradeBalanceChart tradeBalance={tradeData.tradeBalance} />
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
                  padding: '0 0 3em 0',
                }}>
                <TreeMapWrapper sitc2Data={tradeData.sitc2Data} />
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
                  padding: '0 0 3em 0',
                }}>
                {country.length === 0 && (
                  <CountrySearch
                    countryFilter={countryFilter}
                    handleCountryFilterChange={handleCountryFilterChange}
                    countryCodes={countryCodes}
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
