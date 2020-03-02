import React from 'react'
import { render, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import FlowButtons from './FlowButtons'

afterEach(cleanup)

let component

beforeEach(() => {
  component = render(<FlowButtons />)
})

describe('<FlowButtons />', () => {
  test('contains right elements', () => {
    const exportsButton = component.getByText('Exports')
    expect(exportsButton).toBeDefined()
    const importsButton = component.getByText('Imports')
    expect(importsButton).toBeDefined()
  })
})
