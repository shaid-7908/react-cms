import { useGetUserRoleList } from "@/features/users/hooks/getRoles";
import { useGetUserList } from "@/features/users/hooks/getUserList";
import { UsersTable } from "@/features/users/components/UsersTable";

function TechnicianManagement() {
    // 1. Fetch roles first
    const { data: rolesResponse, isLoading: isLoadingRoles, isError: isErrorRoles } = useGetUserRoleList();
    
    // 2. Extract the Technician role ID from the response
    const technicianRole = rolesResponse?.data?.docs?.find((r: any) => r.role === 'Technician');
    const technicianRoleId = technicianRole?._id;

    // 3. We pass the technicianRoleId to our user list payload.
    // The second argument `!!technicianRoleId` converts the ID to a boolean (true/false).
    // If the ID is undefined (because roles are still loading), it is false, and TanStack waits!
    const { data, isLoading, isError } = useGetUserList({
        page: 1,
        limit: 10,
        role: technicianRoleId
    }, !!technicianRoleId); 

    // Handle overall loading state (either roles are loading, or the user list is loading)
    if (isLoadingRoles || (isLoading && !!technicianRoleId)) {
        return <div className="p-4">Loading technicians...</div>;
    }
    
    if (isErrorRoles || isError) {
        return <div className="p-4 text-red-500">Error loading data.</div>;
    }

    return (
      <div className="flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col gap-2">
          <div className="flex flex-col gap-4  py-4 md:gap-6 md:py-6">
            <UsersTable users={data?.data?.docs || []} />
          </div>
        </div>
      </div>
    );
}
export default TechnicianManagement