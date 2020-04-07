import React, { useState } from 'react'
import ProductsTreeMap from './ProductsTreeMap'
import { Dimmer, Loader } from 'semantic-ui-react'
import FlowButtons from '../FlowButtons/FlowButtons'

const TreeMapWrapper = ({ sitc2Data }) => {
  const [flow, setFlow] = useState('exports')

  if (sitc2Data === undefined) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    )
  }

  return (
    <>
      <FlowButtons setFlow={setFlow} />
      <ProductsTreeMap sitc2Data={sitc2Data} flow={flow} />
    </>
  )
}

export default TreeMapWrapper
