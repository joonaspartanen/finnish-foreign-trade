import React from 'react'
import { Menu } from 'semantic-ui-react'

const Footer = () => {
  return (
    <Menu inverted secondary style={{ backgroundColor: '#333', marginTop: '0px' }}>
      <Menu.Item link as='a' href='https://github.com/joonaspartanen/finnish-foreign-trade'>
        About
      </Menu.Item>
    </Menu>
  )
}

export default Footer
