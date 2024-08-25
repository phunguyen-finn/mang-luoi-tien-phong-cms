import AccountPage from "@/components/pages/accounts/AccountPage";
import UserService from "@/services/user.service";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ params: { accountId } }: { params: { accountId: string } }) {
    const current_user = JSON.parse(headers().get('x-MLTP-Auth') as string);
    if (current_user.authority !== 'ADMINISTRATOR') redirect('/accounts');

    const user = await UserService.getUserByUid(accountId);
    if (!user) redirect('/accounts');
    return <AccountPage current_user_email={current_user.email} user={user} />;
}