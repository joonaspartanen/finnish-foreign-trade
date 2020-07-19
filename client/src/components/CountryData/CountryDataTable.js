import React from 'react'
import { Table, Header } from 'semantic-ui-react'

const CountryDataTable = ({ country, tradeData, flow }) => {

  if (tradeData.length === 0) {
    return <div>No data available</div>
  }

  return (
    <Table inverted basic compact celled selectable singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan='2' textAlign='center'>
            <Header as='h3' style={{ color: '#fff' }}>
              Finland {flow === 'exports' ? ' exported to ' : ' imported from '} {country.name}
            </Header>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tradeData.map(product => (
          <Table.Row key={product.group}>
            <Table.Cell>{product.group}</Table.Cell>
            <Table.Cell>{product.value} €</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default CountryDataTable
