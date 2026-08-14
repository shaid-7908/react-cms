import { useQuery } from "@tanstack/react-query";
import { fetchUserList, type GetUserListPayload } from "../api/userApi";

// Hooks should always start with "use"
export const useGetUserList = (payload: GetUserListPayload, isReady: boolean = true) => {
    return useQuery({
        // Include the payload in the queryKey so TanStack caches different pages separately!
        queryKey: ['users', payload],
        queryFn: () => fetchUserList(payload),
        // If isReady is false, TanStack Query will pause and wait to fetch!
        enabled: isReady,
    });
}