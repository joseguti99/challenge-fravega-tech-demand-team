import './card.css';
import { User } from "@/src/interfaces/users";
import { useRouter } from 'next/navigation';
import ButtonFav from "../ButtonFav";
import Image from "next/image";

export interface CardProps {
    user: User;
    markAsFavorite: (user: User) => void;
    isFavorited: boolean;
}

export default function Card({ user, markAsFavorite, isFavorited }: CardProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/users/${user.login}`);
    };

    return (
        <div className="card">
            <div className="card-header">
                <ButtonFav 
                    isFavorite={isFavorited} 
                    toggleFavorite={() => markAsFavorite(user)} />
            </div>
            <Image
                src={user.avatar_url}
                alt={user.login}
                width={420}
                height={420}
            />
            <h3 className="card-name">{user.login.toUpperCase()}</h3>
            <button className="btn-view-details" onClick={handleClick}>Ver Perfil</button>
        </div>
    );
}