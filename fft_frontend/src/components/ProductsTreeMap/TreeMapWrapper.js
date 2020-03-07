import React, { useState } from 'react'
import ProductsTreeMap from './ProductsTreeMap'
import FlowButtons from '../FlowButtons/FlowButtons'

const TreeMapWrapper = ({ SITC2Data }) => {
  const [flow, setFlow] = useState('exports')

  return (
    <>
      <FlowButtons setFlow={setFlow} />
      <ProductsTreeMap SITC2Data={SITC2Data} flow={flow} />
    </>
  )
}

export default TreeMapWrapper
