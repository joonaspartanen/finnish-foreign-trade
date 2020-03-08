import React from 'react'
import { Menu } from 'semantic-ui-react'

const NavBar = () => {
  return (
    <Menu inverted stackable size='large' style={{ backgroundColor: '#333', marginBottom: '0px' }}>
      <Menu.Item header>Finnish Foreign Trade Visualized</Menu.Item>
      <Menu.Item link as='a' href='#trade-map'>
        Trade Map
      </Menu.Item>
      <Menu.Item link as='a' href='#trade-balance'>
        Trade Balance
      </Menu.Item>
      <Menu.Item link as='a' href='#imports-by-product'>
        By product group
      </Menu.Item>
      <Menu.Item link as='a' href='#trade-partners'>
        By trade partner
      </Menu.Item>
    </Menu>
  )
}

export default NavBar
