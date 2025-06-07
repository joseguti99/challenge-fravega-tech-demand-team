import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from './index'

describe('SearchBar', () => {
  const mockOnChange = jest.fn()
  const mockOnSubmit = jest.fn()
  const defaultProps = {
    value: '',
    onChange: mockOnChange,
    onSubmit: mockOnSubmit
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('se renderiza correctamente', () => {
    render(<SearchBar {...defaultProps} />)
    const input = screen.getByRole('textbox')
    expect(input).toBeTruthy()
  })

  it('muestra el valor pasado como prop', () => {
    const testValue = 'búsqueda de prueba'
    render(<SearchBar {...defaultProps} value={testValue} />)
    const input = screen.getByRole('textbox')
    expect(input.value).toBe(testValue)
  })

  it('llama a onChange cuando se escribe en el input', () => {
    render(<SearchBar {...defaultProps} />)
    const input = screen.getByRole('textbox')
    
    fireEvent.change(input, { target: { value: 'nuevo texto' } })
    
    expect(mockOnChange).toHaveBeenCalledTimes(1)
  })

  it('llama a onSubmit cuando se hace clic en el botón de buscar', () => {
    render(<SearchBar {...defaultProps} />)
    const button = screen.getByRole('button')
    
    fireEvent.click(button)
    
    expect(mockOnSubmit).toHaveBeenCalledTimes(1)
  })

  it('no llama a onSubmit con otras teclas que no sean Enter', () => {
    render(<SearchBar {...defaultProps} />)
    const input = screen.getByRole('textbox')
    
    fireEvent.keyDown(input, { key: 'Escape', code: 'Escape' })
    fireEvent.keyDown(input, { key: 'Tab', code: 'Tab' })
    
    expect(mockOnSubmit).not.toHaveBeenCalled()
  })

  it('mantiene el foco en el input después de hacer clic en buscar', () => {
    render(<SearchBar {...defaultProps} />)
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')
    
    input.focus()
    fireEvent.click(button)
    
    expect(document.activeElement).toBe(input)
  })
})