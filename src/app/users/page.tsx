import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"
import { getAllUsers } from "@/src/services/users/userService"
import UserClient from "./client"

export default async function UserPage() {
    const queryClient = new QueryClient()

    // Server-side fetch con React Query
    await queryClient.prefetchQuery({
        queryKey: ['github-users'],
        queryFn: getAllUsers
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <UserClient />
        </HydrationBoundary>
    )
}