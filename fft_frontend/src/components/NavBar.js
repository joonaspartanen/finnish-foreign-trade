import React from 'react'
import { Container, Menu, Icon } from 'semantic-ui-react'

const NavBar = () => {
  return (
    <Menu inverted size='massive' style={{ backgroundColor: '#333', marginBottom: '0px' }}>
      <Container fluid>
        <Menu.Item header>
          <Icon name='euro sign' size='large'></Icon>
          Finnish Foreign Trade Visualized</Menu.Item>
          <Menu.Item link as='a' href='#trade-map'>
          Trade Map
        </Menu.Item>
        <Menu.Item link as='a' href='#trade-balance'>
          Trade Balance
        </Menu.Item>
        <Menu.Item link as='a' href='#imports-by-product'>
          By product group
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default NavBar
