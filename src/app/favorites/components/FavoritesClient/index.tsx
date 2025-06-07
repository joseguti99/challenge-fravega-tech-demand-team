'use client'

import { User } from "@/src/interfaces/users"
import { useEffect, useState } from "react"
import { CACHE_KEY_FAVORITES, getFavorites } from "@/src/cache/favorites"
import CardContainer from "../CardContainer"

export default function FavoritesClient() {
    const [data, setData] = useState<User[]>([]);

    const updateFavorites = () => setData(getFavorites());

    useEffect(() => {
        updateFavorites()
        window.addEventListener(CACHE_KEY_FAVORITES, updateFavorites);
        return () => {
            window.removeEventListener(CACHE_KEY_FAVORITES, updateFavorites);
        };
    }, [])

    return <CardContainer users={data} />
}