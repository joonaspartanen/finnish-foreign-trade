import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ScrollableAnchor from 'react-scrollable-anchor'
import { Container, Loader } from 'semantic-ui-react'
import './App.scss'
import CountryDataWrapper from './components/CountryData/CountryDataWrapper'
import CountrySearch from './components/CountryData/CountrySearch'
import Footer from './components/Footer/Footer'
import MapWrapper from './components/Map/MapWrapper'
import NavBar from './components/NavBar/NavBar'
import TreeMapWrapper from './components/ProductsTreeMap/TreeMapWrapper'
import TradeBalanceChart from './components/TradeBalanceChart/TradeBalanceChart'
import { initializeTradeData } from './reducers/tradeDataReducer'
import { initializeCountryCodes } from './reducers/countryReducer'

const App = () => {
  const dispatch = useDispatch()

  const [year, setYear] = useState(2019)
  const [country, setCountry] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const handleCountryFilterChange = countryName => {
    setCountryFilter(countryName)
    const country = countryCodes.filter(c => c.name === countryName)
    setCountry(country)
  }

  const state = useSelector(state => state)
  const tradeData = state.tradeData
  const countryCodes = state.countryData.countryCodes
  console.log(state)

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
        {tradeData.importsData !== undefined && tradeData.exportsData !== undefined && (
          <div>
            <ScrollableAnchor id={'trade-map'}>
              <section className='chart-section first'>
                <MapWrapper imports={tradeData.importsData} exports={tradeData.exportsData}></MapWrapper>
                <a href='#trade-balance' style={{ position: 'absolute', bottom: '2em' }}>
                  <div className='arrow-down'></div>
                </a>
              </section>
            </ScrollableAnchor>
            <ScrollableAnchor id={'trade-balance'}>
              <section className='chart-section'>
                <TradeBalanceChart tradeBalance={tradeData.tradeBalance} />
                <a href='#imports-by-product' style={{ position: 'absolute', bottom: '2em' }}>
                  <div className='arrow-down'></div>
                </a>
              </section>
            </ScrollableAnchor>
            <ScrollableAnchor id={'imports-by-product'}>
              <section className='chart-section'>
                <TreeMapWrapper sitc2Data={tradeData.sitc2Data} />
                <a href='#trade-partners' style={{ position: 'absolute', bottom: '2em' }}>
                  <div className='arrow-down'></div>
                </a>
              </section>
            </ScrollableAnchor>
            <ScrollableAnchor id={'trade-partners'}>
              <section className='chart-section'>
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
              </section>
            </ScrollableAnchor>
          </div>
        )}
        <Footer />
      </Container>
    </div>
  )
}

export default App
