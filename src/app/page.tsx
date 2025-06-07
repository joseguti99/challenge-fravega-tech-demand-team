'use client';

import './home.css';
import { useRouter } from 'next/navigation';
import routes from '@/src/utils/routes';
import Image from 'next/image';
import logoFravega from '@/src/assets/logo-fravega.png';
import { useClock } from '../hooks/useClock';
import motivationalMessages from '../utils/motivationalMessages';
import { useEffect, useState } from 'react';
import DigitalClock from '../components/DigitalClock';

export default function Home() {
    const router = useRouter();
    const { time } = useClock();
    const [messageIndex, setMessageIndex] = useState(0);

    const handleStart = () => {
        router.push(routes.users);
    };

    useEffect(() => {
        const messageTimer = setInterval(() => {
            setMessageIndex((prev) => (prev + 1) % motivationalMessages.length);
        }, 4000);

        return () => {
            clearInterval(messageTimer);
        };
    }, []);

    return (
        <div className="homepage-container">
            <Image src={logoFravega} alt="logo" className="homepage-logo" />
            <h1 className="homepage-title">Challenge Técnico</h1>
            <h2 className="homepage-subtitle">Frávega Tech - Demand Team</h2>
            <p className="homepage-text">
                Bienvenido/a al challenge técnico solicitado por Frávega. Hacé clic en el botón para comenzar.
            </p>
            <DigitalClock time={time} />
            <div className="message-container">
                <p className="motivational-message">
                    {motivationalMessages[messageIndex]}
                </p>
            </div>
            <button className="homepage-button" onClick={handleStart}>
                Comenzar
            </button>
            <p className="homepage-author">
                Desarrollado por:{' '}
                <a
                    href="https://www.linkedin.com/in/jose-gabriel-gutierrez"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="homepage-author-link"
                >
                    Jose Gutierrez
                </a>
            </p>
        </div>
    );
}