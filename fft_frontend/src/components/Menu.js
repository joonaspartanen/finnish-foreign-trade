import React from 'react'

const Menu = ({ showImports, setShowImports }) => {

  return (
    <div>
      <button onClick={() => setShowImports(true)}>Imports</button>
      <button onClick={() => setShowImports(false)}>Exports</button>
    </div>
  )
}

export default Menu
