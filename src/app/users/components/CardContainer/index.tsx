'use client'

import './cardContainer.css';
import { useGetUser } from "../../hooks/useGetUserQuery"
import LinearLoader from "@/src/components/LinearLoader";
import ListOfUsers from "@/src/components/ListOfUsers";
import { User } from '@/src/interfaces/users';

interface CardContainerProps {
    searchResults?: User[];
    searchTerm?: string;
    isSearching?: boolean;
}

export default function CardContainer({
    searchResults,
    searchTerm,
    isSearching
}: CardContainerProps) {
    const { data: defaultUsers, isLoading: isLoadingDefault } = useGetUser();

    if (isSearching) return <p>Buscando usuarios...</p>

    if (isLoadingDefault && !searchTerm) return <LinearLoader/>

    const usersToShow = searchResults && searchTerm ? searchResults : defaultUsers

    const showingSearch = searchResults && searchTerm

    return (
        <div className="home-container">
            {showingSearch && (<h3 className="title-users">Resultados para: "{searchTerm}"</h3>)}
            {showingSearch && (!searchResults || searchResults.length === 0) && (
                <p>No se encontraron usuarios con ese nombre</p>
            )}
            { usersToShow && <ListOfUsers users={usersToShow} /> }
        </div>
    )
}