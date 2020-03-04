import React from 'react'
import { Container, Menu } from 'semantic-ui-react'

const Footer = () => {
  return (
    <Menu inverted secondary style={{ backgroundColor: '#333', marginTop: '0px' }}>
      <Container fluid>
        <Menu.Item link as='a' href='https://github.com/joonaspartanen/finnish-foreign-trade'>
          About
        </Menu.Item>
      </Container>
    </Menu>
  )
}

export default Footer
