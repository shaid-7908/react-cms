import { apiClient } from "@/lib/axios";
export interface GetUserListPayload{
    page:number;
    limit:number;
    role?: string; // Add role ID for filtering
}

export const fetchUserList = async (data:GetUserListPayload)=>{
const response = await apiClient.post("/v1/admin/user/getall", data)
return response.data
}

export const fetchRoles = async ()=>{
    const response = await apiClient.post("/v1/admin/role/getall",{page:1,limit:100})
    return response.data
}
