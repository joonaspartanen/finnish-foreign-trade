import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'

const FlowButtons = ({ setFlow }) => {
  const [exportsActive, setExportsActive] = useState(true)

  return (
    <div style={{ position: 'absolute', bottom: '2em', left: '2em' }}>
      <Button.Group>
        <Button
          toggle
          active={exportsActive}
          content='Exports'
          onClick={value => {
            if (!exportsActive) {
              setExportsActive(true)
              setFlow('exports')
            }
          }}
        />
        <Button
          toggle
          active={!exportsActive}
          content='Imports'
          onClick={value => {
            if (exportsActive) {
              setExportsActive(false)
              setFlow('imports')
            }
          }}
        />
      </Button.Group>
    </div>
  )
}

export default FlowButtons
