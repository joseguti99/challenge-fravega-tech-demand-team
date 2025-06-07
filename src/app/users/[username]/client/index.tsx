'use client'

import { useState, useEffect } from "react";
import { useGetReposByUsername, useGetUserByUsername } from '../hooks/useGetUserDetailQuery'
import Detail from "../components/Detail";
import LinearLoader from "@/src/components/LinearLoader";
import { isFavorite, toggleFavorite } from "@/src/cache/favorites";
import useAlert from "@/src/components/Alert/hooks/useAlert";
import { User } from "@/src/interfaces/users";

export default function UserDetailClient({ username }: { username: string }) {
    const { data, isLoading, error } = useGetUserByUsername(username)
    const { data: repos, isLoading: isLoadingRepos } = useGetReposByUsername(username)
    const { showToast } = useAlert();
    const [userIsFavorite, setUserIsFavorite] = useState(false);

    // Sincronizar el estado con el valor real de favoritos cuando data cambie
    useEffect(() => {
        if (data) {
            setUserIsFavorite(isFavorite(data));
        }
    }, [data]);

    const markAsFavorite = (user: User) => {
        toggleFavorite(user);
        const favorited = isFavorite(user);
        setUserIsFavorite(favorited);

        if (favorited) {
            showToast(`Usuario ${user.login} añadido a favoritos`);
        } else {
            showToast(`Usuario ${user.login} eliminado de favoritos`);
        }
    };

    if (isLoading || isLoadingRepos) return <LinearLoader />

    if (error || !data) {
        return (
            <div className="user-detail-container">
                <div className="error-container">Error al cargar el usuario</div>
            </div>
        )
    }

    return (
        <Detail
            data={data}
            repos={repos}
            isFavorite={userIsFavorite}
            toggleFavorite={() => markAsFavorite(data)} />
    )
}