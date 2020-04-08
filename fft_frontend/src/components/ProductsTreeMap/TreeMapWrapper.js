import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import FlowButtons from '../FlowButtons/FlowButtons'
import ProductsTreeMap from './ProductsTreeMap'

const TreeMapWrapper = ({ sitc2Data }) => {

  if (sitc2Data === undefined) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    )
  }

  return (
    <>
      <FlowButtons />
      <ProductsTreeMap />
    </>
  )
}

export default TreeMapWrapper
