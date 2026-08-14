import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"

export interface UserDocument {
  _id: string;
  fullName: string;
  email: string;
  userName: string;
  profileImage: string;
  status: string;
  createdAt: string;
}

export function UsersTable({ users }: { users: UserDocument[] }) {
  if (!users || users.length === 0) {
    return (
      <div className="rounded-md border p-8 text-center text-muted-foreground bg-white">
        No users found.
      </div>
    );
  }

  return (
    <div className="rounded-md border bg-white shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={user.profileImage} alt={user.fullName} />
                    <AvatarFallback>{user.fullName?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-900">{user.fullName}</span>
                    <span className="text-xs text-muted-foreground">{user.email}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-gray-600">{user.userName}</TableCell>
              <TableCell>
                <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                  {user.status}
                </Badge>
              </TableCell>
              <TableCell className="text-gray-500">
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit User</DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">Delete User</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
