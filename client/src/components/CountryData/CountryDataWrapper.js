import React, { useState, useEffect } from 'react'
import dataService from '../../services/dataService'
import { Grid, Button, Icon, Dimmer, Loader, Header } from 'semantic-ui-react'
import CountryDataTable from './CountryDataTable'
import './CountryData.scss'
import TradePartnerRankDetails from './TradePartnerRankDetails'

const CountryDataWrapper = ({
  country,
  setCountry,
  setCountryFilter,
  year,
  tradePartnerRankings,
}) => {
  console.log(country)

  const [countryImports, setCountryImports] = useState([])
  const [countryExports, setCountryExports] = useState([])

  const tradePartnerRanking = tradePartnerRankings?.find(c => c.id === country?.code?.toUpperCase())

  console.log(tradePartnerRanking)

  const getTopProductCategories = (data, amount) =>
    data.slice(0, amount).filter(product => product.value !== null)

  useEffect(() => {
    dataService.getSitc2CountryData('imports', year, country).then(res => {
      setCountryImports(res)
    })
    dataService.getSitc2CountryData('exports', year, country).then(res => {
      setCountryExports(res)
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
    <>
      <Button
        icon
        circular
        className='back-button'
        onClick={() => {
          setCountryFilter('')
          setCountry([])
        }}>
        <Icon name='angle left' size='large' />
      </Button>
      <Header as='h2'>
        Finland's trade with {country.name} ({year})
        <span>
          <img
            className='flag'
            src={`https://www.countryflags.io/${country.code}/flat/64.png`}
            alt={`Flag of ${country.name}`}></img>
        </span>
      </Header>
      <Grid container stackable celled='internally'>
        <Grid.Column width={4}>
          <TradePartnerRankDetails tradePartnerRanking={tradePartnerRanking} />
        </Grid.Column>
        <Grid.Column width={12}>
          <CountryDataTable
            country={country}
            tradeData={getTopProductCategories(countryExports, 5)}
            flow={'exports'}
          />
          <CountryDataTable
            country={country}
            tradeData={getTopProductCategories(countryImports, 5)}
            flow={'imports'}
          />
        </Grid.Column>
      </Grid>
    </>
  )
}

export default CountryDataWrapper
