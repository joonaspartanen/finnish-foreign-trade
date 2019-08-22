import React from 'react'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

const Menu = ({ setFlow }) => {


  return (
    <div style={{ position: 'absolute', bottom: '2em', left: '2em' }}>
      <ToggleButtonGroup
        toggle='true'
        name='change-flow'>
        <ToggleButton
          variant='primary'
          onClick={(value) => setFlow('exports')}>
          Exports 2018
        </ToggleButton>
        <ToggleButton
          variant='secondary'
          onClick={(value) => setFlow('imports')}>
          Imports 2018
        </ToggleButton>
      </ToggleButtonGroup>
    </div >
  )
}

export default Menu