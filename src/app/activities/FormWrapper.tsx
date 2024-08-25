import ActivityService, { Activity } from "@/services/activity.service"
import ActivityForm from "@/components/pages/activities/ActivityForm"
import { headers } from "next/headers";
import { AUTHORITY } from "@/services/user.service";

export default async function ActivityFormWrapper({ initialData, onSubmit }: { initialData?: Activity, onSubmit: any }) {
    const categories = await ActivityService.getCategories()
    const user = JSON.parse(headers().get('x-MLTP-Auth') as string);
    const isAdmin = user.authority === AUTHORITY.ADMINISTRATOR
    return (
        <ActivityForm initialData={initialData} categories={categories} onSubmit={onSubmit} isAdmin={isAdmin} />
    )
}