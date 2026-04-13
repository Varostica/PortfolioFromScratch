import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Spinner from './Spinner'

describe('Spinner Component', () => {
  it('renders without crashing', () => {
    render(<Spinner />)
    const spinnerElement = screen.getByRole('status')
    expect(spinnerElement).toBeInTheDocument()
  })

  it('renders the accessible visually hidden "Loading..." text', () => {
    render(<Spinner />)
    // Looking for the sr-only text "Loading…"
    const hiddenText = screen.getByText('Loading…')
    expect(hiddenText).toBeInTheDocument()
    expect(hiddenText).toHaveClass('sr-only')
  })

  it('renders the custom label when passed as a prop', () => {
    render(<Spinner label="Fetching data..." />)
    const labelElement = screen.getByText('Fetching data...')
    expect(labelElement).toBeInTheDocument()
    // It should have the pulse animation based on component implementation
    expect(labelElement).toHaveClass('animate-pulse')
  })

  it('applies the correct default size classes', () => {
    render(<Spinner />)
    // The inner div with the spin animation
    // The default size is 'md'
    const spinnerElement = screen.getByRole('status').firstChild as HTMLElement
    expect(spinnerElement).toHaveClass('h-10', 'w-10')
  })
})
