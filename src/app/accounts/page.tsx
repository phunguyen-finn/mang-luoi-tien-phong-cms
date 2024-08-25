import AccountsList from "@/components/pages/accounts/AccountsPage";
import UserService, { AUTHORITY } from "@/services/user.service";
import { headers } from "next/headers";

export default async function AccountsPage() {
    const user = JSON.parse(headers().get('x-MLTP-Auth') as string);
    const users = await UserService.getAllUsers();
    const isAdmin = user.authority === AUTHORITY.ADMINISTRATOR;
    return (
        <AccountsList users={users} isAdmin={isAdmin} />
    );
}