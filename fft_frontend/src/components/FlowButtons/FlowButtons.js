import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'semantic-ui-react'
import { setFlowDirection } from '../../reducers/tradeDataReducer'

const FlowButtons = ({ setFlow }) => {
  const [exportsActive, setExportsActive] = useState(true)
  const dispatch = useDispatch()

  return (
    <div style={{ position: 'absolute', bottom: '2em', left: '2em' }}>
      <Button.Group>
        <Button
          toggle
          active={exportsActive}
          content='Exports'
          onClick={(value) => {
            if (!exportsActive) {
              setExportsActive(true)
              dispatch(setFlowDirection('exports'))
            }
          }}
        />
        <Button
          toggle
          active={!exportsActive}
          content='Imports'
          onClick={(value) => {
            if (exportsActive) {
              setExportsActive(false)
              dispatch(setFlowDirection('imports'))
            }
          }}
        />
      </Button.Group>
    </div>
  )
}

export default FlowButtons
