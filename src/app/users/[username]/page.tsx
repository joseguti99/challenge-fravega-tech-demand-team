import '@/src/styles/global.css'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getUserByUsername } from '@/src/services/users/userService'
import UserDetailClient from './client'

interface PageProps {
    params: Promise<{
        username: string
    }>
}

export default async function UserDetailPage({ params }: PageProps) {
    const queryClient = new QueryClient()
    const { username } = await params

    await queryClient.prefetchQuery({
        queryKey: ['user', username],
        queryFn: () => getUserByUsername(username),
    })

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <UserDetailClient username={username} />
        </HydrationBoundary>
    )
}