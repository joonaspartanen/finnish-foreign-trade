import React, { useState, useEffect } from 'react'
import dataService from '../services/dataService'
import { color } from '@amcharts/amcharts4/core'

const CountryData = ({ country }) => {
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
    return null
  }

  console.log(country[0])
  return (
    <>
      <h2>Finland imported from {country[0].name} </h2>
      <table>
        <tbody>
          {countryImports.slice(0, 10).map(a => (
            <tr key={a.group}>
              <td style={{ color: '#fff' }}>
                {a.group}: {a.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Finland exported to {country[0].name} </h2>
      <table>
        <tbody>
          {countryExports.slice(0, 10).map(a => (
            <tr key={a.group}>
              <td style={{ color: '#fff' }}>
                {a.group}: {a.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default CountryData
