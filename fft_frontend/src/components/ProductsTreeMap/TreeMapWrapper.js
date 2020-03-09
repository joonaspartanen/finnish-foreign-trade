import React, { useState } from 'react'
import ProductsTreeMap from './ProductsTreeMap'
import { Dimmer, Loader } from 'semantic-ui-react'
import FlowButtons from '../FlowButtons/FlowButtons'

const TreeMapWrapper = ({ SITC2Data }) => {
  const [flow, setFlow] = useState('exports')

  if (SITC2Data === undefined) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    )
  }

  return (
    <>
      <FlowButtons setFlow={setFlow} />
      <ProductsTreeMap SITC2Data={SITC2Data} flow={flow} />
    </>
  )
}

export default TreeMapWrapper
