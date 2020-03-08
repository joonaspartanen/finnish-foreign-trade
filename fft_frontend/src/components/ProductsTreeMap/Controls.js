import React, { useState } from 'react'
import { Form } from 'semantic-ui-react'

const Controls = ({ flow, setFlow }) => {
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

  const [year, setYear] = useState(2019)

  return (
    <div>
      <Form inverted>
        <Form.Dropdown
          onChange={(event, { value }) => setYear(value)}
          options={years}
          placeholder='Year'
          selection
          value={year}
        />
        <Form.Group>
          <Form.Radio
            label='Exports'
            name='radioGroup'
            value='exports'
            checked={flow === 'exports'}
            onChange={() => setFlow('exports')}
          />
          <Form.Radio
            label='Imports'
            name='radioGroup'
            value='imports'
            checked={flow === 'imports'}
            onChange={() => setFlow('imports')}
          />
        </Form.Group>
      </Form>
    </div>
  )
}

export default Controls
