import React, { useState } from 'react'
import ProductsTreeMap from './ProductsTreeMap'
import Controls from './Controls'
import { Container, Grid } from 'semantic-ui-react'

const TreeMapWrapper = ({ SITC2Data }) => {
  const [flow, setFlow] = useState('exports')

  return (
    <Container fluid>
      <Grid>
        <Grid.Column width={4} verticalAlign='middle' style={{paddingLeft: '10em'}}>
          <Controls flow={flow} setFlow={setFlow} />
        </Grid.Column>
        <Grid.Column width={12}>
          <ProductsTreeMap SITC2Data={SITC2Data} flow={flow} />
        </Grid.Column>
      </Grid>
    </Container>
  )
}

export default TreeMapWrapper
