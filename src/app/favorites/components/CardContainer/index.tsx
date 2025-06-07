import './cardContainer.css';
import { User } from "@/src/interfaces/users";
import ListOfUsers from "@/src/components/ListOfUsers";

export default function CardContainer({ users }: { users: User[] }) {
    return (
        <div className="favorites-container">
            <ListOfUsers users={users} />
        </div>
    )
}