import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import dataService from '../../services/dataService'
import { Grid, Button, Icon, Dimmer, Loader } from 'semantic-ui-react'
import CountryDataTable from './CountryDataTable'
import './CountryData.scss'
const ordinal = require('ordinal')

const CountryDataWrapper = ({ country, setCountry, setCountryFilter, year }) => {
  const [countryImports, setCountryImports] = useState([])
  const [countryExports, setCountryExports] = useState([])

  const tradeData = useSelector(state => state.tradeData)
  const tradePartnerRank =
    tradeData.importsData.findIndex(c => c.id === country?.code?.toUpperCase()) + 1

  const getTop10ProductCategories = data =>
    data.slice(0, 10).filter(product => product.value !== null)

  useEffect(() => {
    dataService.getSitc2CountryData('imports', year, country).then(res => {
      setCountryImports(res.data)
    })
    dataService.getSitc2CountryData('exports', year, country).then(res => {
      setCountryExports(res.data)
    })
  }, [country, year])

  if (country === '') {
    return null
  }

  if (countryImports.length === 0 && countryExports.length === 0) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    )
  }

  return (
    <Grid container stackable relaxed style={{ paddingTop: '3em' }}>
      <Button
        icon
        circular
        onClick={() => {
          setCountryFilter('')
          setCountry([])
        }}
        style={{ position: 'absolute', top: '1em', left: '1em' }}>
        <Icon name='angle left' size='large' />
      </Button>
      <img
        className='flag'
        src={`https://www.countryflags.io/${country.code}/flat/64.png`}
        alt={`Flag of ${country.name}`}></img>
      <h3>Finland's {ordinal(tradePartnerRank)} largest trade partner</h3>
      <Grid.Row columns={2}>
        <Grid.Column>
          <CountryDataTable
            country={country}
            tradeData={getTop10ProductCategories(countryExports)}
            flow={'exports'}
          />
        </Grid.Column>
        <Grid.Column>
          <CountryDataTable
            country={country}
            tradeData={getTop10ProductCategories(countryImports)}
            flow={'imports'}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default CountryDataWrapper
