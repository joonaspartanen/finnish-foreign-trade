import React, { useState, useEffect } from 'react';
import axios from 'axios'
const baseUrl = '/values'

const getData = async () => {
  const res = await axios.get(baseUrl)
  return res
}

const App = () => {

  const [values, setValues] = useState([])

  useEffect(() => {
    getData().then(initialValues => setValues(initialValues))
  }, [])


  return (
    <h1>Finnish Foreign Trade Visualized</h1>
  )
}

export default App
