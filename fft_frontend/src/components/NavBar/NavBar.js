import React from 'react'
import { Menu, Dropdown } from 'semantic-ui-react'

const NavBar = ({ year, setYear }) => {
  const years = [
    { key: 2019, text: '2019', value: 2019 },
    { key: 2018, text: '2018', value: 2018 },
    { key: 2017, text: '2017', value: 2017 },
    { key: 2016, text: '2016', value: 2016 },
    { key: 2015, text: '2015', value: 2015 },
    { key: 2014, text: '2014', value: 2014 },
    { key: 2013, text: '2013', value: 2013 },
    { key: 2012, text: '2012', value: 2012 }
  ]

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
