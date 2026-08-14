import { useQuery } from "@tanstack/react-query";
import { fetchRoles } from "../api/userApi";

// Hooks should always start with "use"
export const useGetUserRoleList = () => {
    return useQuery({
        // Include the payload in the queryKey so TanStack caches different pages separately!
        queryKey: ['roles'],
        queryFn: () => fetchRoles(),
    });
}