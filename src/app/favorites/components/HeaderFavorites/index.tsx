'use client'

import Image from 'next/image';
import './headerFavorites.css';
import LogoFravega from '@/src/assets/logo-fravega.png'
import { useRouter } from 'next/navigation';
import routes from '@/src/utils/routes';

export default function HeaderFavorites() {
    const router = useRouter()

    const returnToUsers = () => {
        router.push(routes.users)
    }

    return (
        <div className="header-favorites-container">
            <section className="header-favorites-content">
                <div>
                    <Image
                        src={LogoFravega}
                        alt="logo"
                        className="logo-fravega"
                        priority />
                </div>
                <div>
                    <h1 className='title-favorites'>FAVORITOS</h1>
                </div>
                <div
                    className="btn-return-users"
                    onClick={returnToUsers}
                >
                    Ver usuarios
                </div>
            </section>
        </div>
    )
}