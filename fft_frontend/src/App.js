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
    getData().then(initialValues => setValues(initialValues.data))
  }, [])

  console.log(values)


  return (
    <div>
      <h1>Finnish Foreign Trade Visualized</h1>
      <Countries values={values} />
    </div>
  )
}

const Countries = ({ values }) => {
  if (values.length === 0) {
    return null
  }

  return (
  values.map(value => <div>{value.keys[1]} - {value.keys[3]} ({value.keys[2]}): {value.vals}</div>)
  )

}

export default App
