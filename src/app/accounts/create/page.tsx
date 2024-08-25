import AccountPage from "@/components/pages/accounts/AccountPage";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Page() {
    const current_user = JSON.parse(headers().get('x-MLTP-Auth') as string);
    if (current_user.authority !== 'ADMINISTRATOR') redirect('/accounts');

    return <AccountPage current_user_email={current_user.email} />;
}