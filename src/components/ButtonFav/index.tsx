import './buttonFav.css'
import { useState, useEffect } from 'react';
import FavoriteIcon from '../Icons/favoriteIcon';

interface ButtonFavProps {
    isFavorite: boolean;
    toggleFavorite: () => void;
}

export default function ButtonFav({ isFavorite, toggleFavorite }: ButtonFavProps) {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        // Setea un valor Durante la hidratación 
        setIsHydrated(true);
    }, []);

    const effectiveIsFavorite = isHydrated ? isFavorite : false;
    const title = effectiveIsFavorite ? 'Quitar de favoritos' : 'Añadir a favoritos';

    return (
        <div>
            <button
                onClick={toggleFavorite}
                className="favorite-btn"
                title={title}>
                <FavoriteIcon active={effectiveIsFavorite} />
            </button>
        </div>
    )
}