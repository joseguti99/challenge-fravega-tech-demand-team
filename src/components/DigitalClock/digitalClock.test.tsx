import { render, screen } from '@testing-library/react'
import DigitalClock from './index'

describe('DigitalClock', () => {
    const mockTime = {
        hours: '14',
        minutes: '30',
        seconds: '45',
        milliseconds: '123'
    }

    it('renderiza correctamente todos los elementos del reloj', () => {
        render(<DigitalClock time={mockTime} />)

        // Verifica que el contenedor principal existe
        expect(document.querySelector('.clock-container')).toBeTruthy()
        expect(document.querySelector('.clock-glow')).toBeTruthy()
        expect(document.querySelector('.clock-display')).toBeTruthy()
        expect(document.querySelector('.clock-indicators')).toBeTruthy()
    })

    it('muestra correctamente las horas', () => {
        render(<DigitalClock time={mockTime} />)

        const hoursElement = screen.getByText('14')
        expect(hoursElement).toBeTruthy()
        expect(hoursElement.className).toContain('time-digit hours')
    })

    it('muestra correctamente los minutos', () => {
        render(<DigitalClock time={mockTime} />)

        const minutesElement = screen.getByText('30')
        expect(minutesElement).toBeTruthy()
        expect(minutesElement.className).toContain('time-digit minutes')
    })

    it('muestra correctamente los segundos', () => {
        render(<DigitalClock time={mockTime} />)

        const secondsElement = screen.getByText('45')
        expect(secondsElement).toBeTruthy()
        expect(secondsElement.className).toContain('time-digit seconds')
    })

    it('muestra los separadores de tiempo', () => {
        render(<DigitalClock time={mockTime} />)

        const separators = screen.getAllByText(':')
        expect(separators).toHaveLength(2)
        separators.forEach(separator => {
            expect(separator.className).toContain('time-separator')
        })
    })

    it('renderiza los tres indicadores', () => {
        render(<DigitalClock time={mockTime} />)

        const indicators = document.querySelectorAll('.indicator')
        expect(indicators).toHaveLength(3)
    })

    it('no muestra los milisegundos en el display', () => {
        render(<DigitalClock time={mockTime} />)

        // Los milisegundos no deberían aparecer en el texto visible
        expect(screen.queryByText('123')).toBeNull()
    })

    it('actualiza correctamente cuando cambia el tiempo', () => {
        const { rerender } = render(<DigitalClock time={mockTime} />)

        expect(screen.getByText('14')).toBeTruthy()
        expect(screen.getByText('30')).toBeTruthy()
        expect(screen.getByText('45')).toBeTruthy()

        const newTime = {
            hours: '09',
            minutes: '15',
            seconds: '00',
            milliseconds: '999'
        }

        rerender(<DigitalClock time={newTime} />)

        expect(screen.getByText('09')).toBeTruthy()
        expect(screen.getByText('15')).toBeTruthy()
        expect(screen.getByText('00')).toBeTruthy()
    })

    it('maneja correctamente valores de tiempo con ceros a la izquierda', () => {
        const timeWithZeros = {
            hours: '08',
            minutes: '05',
            seconds: '03',
            milliseconds: '001'
        }

        render(<DigitalClock time={timeWithZeros} />)

        expect(screen.getByText('08')).toBeTruthy()
        expect(screen.getByText('05')).toBeTruthy()
        expect(screen.getByText('03')).toBeTruthy()
    })
})