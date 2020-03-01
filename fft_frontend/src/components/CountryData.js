import React, { useState, useEffect } from 'react'
import dataService from '../services/dataService'
//import { Container, Row, Col, Button } from 'react-bootstrap'
import { Grid, Button, Icon, Dimmer, Loader, Table, Header } from 'semantic-ui-react'
import CountryDataTable from './CountryDataTable'

const CountryData = ({ country, setCountry, setCountryFilter }) => {
  const [countryImports, setCountryImports] = useState([])
  const [countryExports, setCountryExports] = useState([])

  useEffect(() => {
    dataService.getSITC2CountryData('imports', country).then(res => {
      setCountryImports(res.data)
    })
    dataService.getSITC2CountryData('exports', country).then(res => {
      setCountryExports(res.data)
    })
  }, [country])

  if (country.length === 0) {
    return null
  }

  if (countryImports.length === 0 || countryExports.length === 0) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    )
  }

  return (
    <Grid container stackable relaxed>
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
      <Grid.Row columns={2}>
        <Grid.Column>
          <CountryDataTable country={country} tradeData={countryImports} flow={'imported from'} />
        </Grid.Column>
        <Grid.Column>
          <CountryDataTable country={country} tradeData={countryExports} flow={'exported to'} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

export default CountryData
