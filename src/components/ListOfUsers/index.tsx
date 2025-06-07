import './listOfUsers.css';
import Card from "../Card";
import { User } from "@/src/interfaces/users";
import Alert from '../Alert';
import useAlert from '../Alert/hooks/useAlert';
import { isFavorite, toggleFavorite } from '@/src/cache/favorites';

export default function ListOfUsers({ users }: { users: User[] }) {
    const { isVisible, message, showToast, hideToast } = useAlert();

    const markAsFavorite = (user: User) => {
        toggleFavorite(user);

        const favorited = isFavorite(user); // obtener valor actualizado

        if (favorited) {
            showToast(`Usuario ${user.login} añadido a favoritos`);
        } else {
            showToast(`Usuario ${user.login} eliminado de favoritos`);
        }
    };
    
    return (
        <div>
            <ul className="card-container">
                {users && users.map((user: User) => (
                    <Card
                        key={user.id}
                        user={user}
                        isFavorited={isFavorite(user)}
                        markAsFavorite={markAsFavorite} />
                ))}
            </ul>
            <Alert message={message} isVisible={isVisible} onClose={hideToast} />
        </div>
    )
}
