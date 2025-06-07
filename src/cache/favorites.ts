import { getCache, setCache } from "@/src/cache"
import { User } from "@/src/interfaces/users"

export const CACHE_KEY_FAVORITES = 'FAVORITES'

export const getFavorites = (): User[] => {
    const favorites = getCache<User[]>(CACHE_KEY_FAVORITES)
    return favorites || [] 
}

export const setFavorites = (user: User): User[] => {
    const favorites = getCache<User[]>(CACHE_KEY_FAVORITES) || []
    
    // Verificar si el usuario ya esta en favoritos para evitar duplicados
    const existingIndex = favorites.findIndex(fav => fav.id === user.id)
    
    if (existingIndex === -1) {
        favorites.push(user)
        setCache(CACHE_KEY_FAVORITES, favorites)
    }
    
    return favorites
}

export const deleteFavorite = (user: User): User[] => {
    const favorites = getCache<User[]>(CACHE_KEY_FAVORITES) || []
    
    // Usar findIndex para encontrar por ID en lugar de indexOf (que compara objetos)
    const index = favorites.findIndex(fav => fav.id === user.id)
    
    if (index !== -1) {
        favorites.splice(index, 1)
        setCache(CACHE_KEY_FAVORITES, favorites)
    }
    
    return favorites
}

// Función adicional para verificar si un usuario está en favoritos
export const isFavorite = (user: User): boolean => {
    const favorites = getCache<User[]>(CACHE_KEY_FAVORITES) || []
    return favorites.some(fav => fav.id === user.id)
}

// Función para alternar favorito (agregar si no está, eliminar si está)
export const toggleFavorite = (user: User): User[] => {
    const favorites = getCache<User[]>(CACHE_KEY_FAVORITES) || []
    const index = favorites.findIndex(fav => fav.id === user.id)
    if (index === -1) {
        favorites.push(user) // No está en favoritos, agregarlo
    } else {
        favorites.splice(index, 1) // Está en favoritos, eliminarlo
    }
    setCache(CACHE_KEY_FAVORITES, favorites)

    // Emitimos un evento para actualizar el estado del localStorage
    window.dispatchEvent(new Event(CACHE_KEY_FAVORITES))
    return favorites
}

export const countFavorites = (): number => {
    const favorites = getCache<User[]>(CACHE_KEY_FAVORITES) || []
    return favorites.length
}