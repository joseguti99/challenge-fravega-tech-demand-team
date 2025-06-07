import { render } from '@testing-library/react'
import LinearLoader from './index'

describe('LinearLoader', () => {
 it('renderiza correctamente', () => {
    render(<LinearLoader />)
    
    const container = document.querySelector('.linear-loader')
    expect(container).toBeTruthy()
  })

  it('tiene la estructura CSS correcta', () => {
    render(<LinearLoader />)
    
    // Buscar el contenedor principal por clase
    const container = document.querySelector('.linear-loader')
    expect(container).toBeTruthy()
    
    // Buscar la barra del loader por clase
    const loaderBar = document.querySelector('.loader-bar')
    expect(loaderBar).toBeTruthy()
  })
})