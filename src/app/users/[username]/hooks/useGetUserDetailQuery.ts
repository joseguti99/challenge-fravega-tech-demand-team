import { Repository, userDetail } from "@/src/interfaces/users"
import { useQuery } from "@tanstack/react-query"
import { getReposByUsername, getUserByUsername } from "@/src/services/users/userService"

export const useGetUserByUsername = (username: string) => {
    return useQuery<userDetail>({
        queryKey: ['github-users', username],
        queryFn: () => getUserByUsername(username),
    })
}

export const useGetReposByUsername = (username: string) => {
    return useQuery<Repository[]>({
        queryKey: ['github-repos', username],
        queryFn: () => getReposByUsername(username),
    })
}