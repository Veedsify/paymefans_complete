import { Button } from "@/components/ui/button";
import UsersTable from "@/page-components/users/users-table";
import { LucideUserPlus } from "lucide-react";

const Users = () => {
    return (
        <>
            <div className="flex items-center justify-between space-y-2 mb-10">
                <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                <div className="flex items-center space-x-2">
                    <Button>
                        <LucideUserPlus size={15} strokeWidth={3} className="mr-2" />
                        New User
                    </Button>
                </div>
            </div>
            <UsersTable />
        </>
    );
}

export default Users;