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
import D3TradeBalanceChart from './components/TradeBalanceChart/D3TradeBalanceChart'
import { initializeTradeData } from './reducers/tradeDataReducer'
import { initializeCountryCodes } from './reducers/countryReducer'

const App = () => {
  const dispatch = useDispatch()

  const [year, setYear] = useState(2019)
  const [country, setCountry] = useState([])
  const [countryFilter, setCountryFilter] = useState('')

  const handleCountryFilterChange = countryName => {
    setCountryFilter(countryName)
    const country = state.countryCodes.filter(c => c.name === countryName)
    setCountry(country)
  }

  const state = useSelector(state => state)
  const tradeData = state.tradeData

  useEffect(() => {
    dispatch(initializeTradeData(year))
    dispatch(initializeCountryCodes())
  }, [year, dispatch])

  return (
    <div className={state.darkModeActive ? 'main-container dark-mode' : 'main-container'}>
      <Container fluid>
        <NavBar year={year} setYear={setYear} darkModeActive={state.darkModeActive} />
        {(tradeData.importsData === undefined || tradeData.exportsData === undefined) && (
          <div style={{ height: '100vh' }}>
            <Loader active />
          </div>
        )}
        {tradeData.importsData !== undefined && tradeData.exportsData !== undefined && (
          <div>
            <ScrollableAnchor id={'trade-map'}>
              <section
                className={
                  state.darkModeActive ? 'chart-section dark-mode' : 'chart-section'
                }>
                <MapWrapper
                  imports={tradeData.importsData}
                  exports={tradeData.exportsData}></MapWrapper>
                <a href='#trade-balance' className='anchor-link'>
                  <div className='arrow-down'></div>
                </a>
              </section>
            </ScrollableAnchor>
            <ScrollableAnchor id={'trade-balance'}>
              <section
                className={
                  state.darkModeActive ? 'chart-section dark-mode' : 'chart-section'
                }>
                <D3TradeBalanceChart tradeBalance={tradeData.tradeBalance}></D3TradeBalanceChart>
                <a href='#imports-by-product' className='anchor-link'>
                  <div className='arrow-down'></div>
                </a>
              </section>
            </ScrollableAnchor>
            <ScrollableAnchor id={'imports-by-product'}>
              <section
                className={
                  state.darkModeActive ? 'chart-section dark-mode' : 'chart-section'
                }>
                <TreeMapWrapper sitc2Data={tradeData.sitc2Data} year={year} />
                <a href='#trade-partners' className='anchor-link'>
                  <div className='arrow-down'></div>
                </a>
              </section>
            </ScrollableAnchor>
            <ScrollableAnchor id={'trade-partners'}>
              <section
                className={
                  state.darkModeActive ? 'chart-section dark-mode' : 'chart-section'
                }>
                {country.length === 0 && (
                  <CountrySearch
                    countryFilter={countryFilter}
                    handleCountryFilterChange={handleCountryFilterChange}
                    countryCodes={state.countryCodes}
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
        <Footer darkModeActive={state.darkModeActive} />
      </Container>
    </div>
  )
}

export default App
