import { useQuery } from "@tanstack/react-query"
import { getAllUsers, searchUsers } from "@/src/services/users/userService"
import { User } from "@/src/interfaces/users"

export const useGetUser = () => {
    return useQuery<User[]>({
        queryKey: ['github-users'],
        queryFn: getAllUsers,
    })
}

export const useGetSearchUsers = (term: string) => {
    return useQuery<User[]>({
        queryKey: ['github-users', term],
        queryFn: () => searchUsers(term),
        enabled: term.trim().length > 0,
        staleTime: 1000 * 60,
    })
}
