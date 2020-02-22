import React from 'react'
import { Form } from 'react-bootstrap'

const CountrySearch = ({ countryFilter, handleCountryFilterChange }) => {
  return (
    <Form>
      <Form.Group controlId='countryName'>
        <h2 style={{ textAlign: 'center' }}>Search country</h2>
        <Form.Control
          type='text'
          value={countryFilter}
          onChange={event => {
            console.log(event.target.value)
            handleCountryFilterChange(event.target.value)
          }}
        />
      </Form.Group>
    </Form>
  )
}

export default CountrySearch
