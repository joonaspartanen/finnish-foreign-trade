import React from 'react'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'

const Menu = ({ flow, setFlow }) => {


  return (
    <div>
      <ToggleButtonGroup
        toggle='true'
        name='change-flow'>
        <ToggleButton
          variant='secondary'
          onClick={(value) => setFlow('exports')}>
          Exports
        </ToggleButton>
        <ToggleButton
          variant='secondary'
          onClick={(value) => setFlow('imports')}>
          Imports
        </ToggleButton>
      </ToggleButtonGroup >
    </div >
  )
}

export default Menu