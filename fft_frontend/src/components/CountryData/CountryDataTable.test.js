import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CountryDataTable from './CountryDataTable'

let component

const tradeDataMock = [
  { group: 'food', value: 100 },
  { group: 'cars', value: 200 },
  { group: 'trains', value: 300 }
]

const longTradeDataMock = [
  { group: 'food', value: 100 },
  { group: 'cars', value: 200 },
  { group: 'trains', value: 300 },
  { group: 'mice', value: 100 },
  { group: 'aubergines', value: 200 },
  { group: 'boats', value: 300 },
  { group: 'knives', value: 100 },
  { group: 'cheese', value: 200 },
  { group: 'computers', value: 300 },
  { group: 'sofas', value: 100 },
  { group: 'flowers', value: 200 },
  { group: 'boots', value: 300 }
]

const countryMock = [{ name: 'Mexico', code: 'MX' }]

const renderWithData = data => {
  component = render(
    <CountryDataTable tradeData={data} country={countryMock} flow={'imported from'} />
  )
}

afterEach(() => {
  cleanup()
})

describe('<CountryDataTable />', () => {
  test('contains right elements', () => {
    renderWithData(tradeDataMock)
    const header = component.getByText('Finland imported from Mexico')
    expect(header).toBeDefined()
    const table = component.container.querySelector('table')
    expect(table).toBeDefined()
    const tableCells = component.getAllByRole('cell')
    expect(tableCells.length).toEqual(tradeDataMock.length * 2)
  })

  test('contains max 10 rows', () => {
    renderWithData(longTradeDataMock)
    const tableCells = component.container.querySelectorAll('td')
    expect(tableCells.length).toEqual(10 * 2)
  })

  test('contains right groups and values', () => {
    renderWithData(tradeDataMock)
    const tableRows = component.getAllByRole('row')
    tradeDataMock.forEach((a, i) => {
      // i+1 skips the table header row
      expect(tableRows[i + 1]).toHaveTextContent(a.group)
      expect(tableRows[i + 1]).toHaveTextContent(a.value)
    })
  })
})
