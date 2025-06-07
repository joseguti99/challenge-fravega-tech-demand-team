import './digitalClock.css'

interface DigitalClockProps {
    time: {
        hours: string,
        minutes: string,
        seconds: string,
        milliseconds: string
    }
}

export default function DigitalClock({ time } : DigitalClockProps) {
    return (
        <div className="clock-container">
            <div className="clock-glow"></div>
            <div className="clock-display">
                <span className="time-digit hours">{time.hours}</span>
                <span className="time-separator">:</span>
                <span className="time-digit minutes">{time.minutes}</span>
                <span className="time-separator">:</span>
                <span className="time-digit seconds">{time.seconds}</span>
            </div>
            <div className="clock-indicators">
                <div className="indicator"></div>
                <div className="indicator"></div>
                <div className="indicator"></div>
            </div>
        </div>
    )
}