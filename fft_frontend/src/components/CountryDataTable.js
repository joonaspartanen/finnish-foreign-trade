import React from 'react'
import { Table, Header } from 'semantic-ui-react'

const CountryDataTable = ({ country, tradeData, flow }) => {
  return (
    <Table inverted basic celled selectable singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan='2' textAlign='center'>
            <Header as='h3' style={{ color: '#fff' }}>
              Finland {flow} {country[0].name}
            </Header>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tradeData.slice(0, 10).map(a => (
          <Table.Row key={a.group}>
            <Table.Cell>{a.group}</Table.Cell>
            <Table.Cell>{a.value} €</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default CountryDataTable
