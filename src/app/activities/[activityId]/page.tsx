import ActivityPage from "@/components/pages/activities/ActivityPage";
import ActivityService from "@/services/activity.service";
import { AUTHORITY } from "@/services/user.service";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ params: { activityId } }: { params: { activityId: string } }) {
    const activity = await ActivityService.getActivity(activityId);

    if (!activity) redirect('/activities');

    const user = JSON.parse(headers().get('x-MLTP-Auth') as string);
    const isAdmin = user.authority === AUTHORITY.ADMINISTRATOR;
    return <ActivityPage isAdmin={isAdmin} activity={activity} />
}