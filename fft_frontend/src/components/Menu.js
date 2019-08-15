import React from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import { makeStyles } from '@material-ui/core/styles'

const Menu = ({ flow, setFlow, setYear }) => {

  const useStyles = makeStyles(theme => ({
    root: {
      width: 600,
    },
    margin: {
      height: theme.spacing(3),
    }
  }))

  const classes = useStyles()

  return (
    <div className={classes.root}>
      <ToggleButtonGroup
        value={flow}
        exclusive
        onChange={(event, newFlow) => setFlow(newFlow)}>
        <ToggleButton value='exports'>Exports</ToggleButton>
        <ToggleButton value='imports'>Imports</ToggleButton>
      </ToggleButtonGroup >
    </div >
  )
}

export default Menu
