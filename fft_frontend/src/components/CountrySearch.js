import React from 'react'
import { Form } from 'react-bootstrap'
import { Input } from 'semantic-ui-react'

const CountrySearch = ({ countryFilter, handleCountryFilterChange }) => {
  return (
    <Input
      icon='search'
      placeholder='Search...'
      value={countryFilter}
      onChange={event => {
        console.log(event.target.value)
        handleCountryFilterChange(event.target.value)
      }}></Input>
  )
}

export default CountrySearch
