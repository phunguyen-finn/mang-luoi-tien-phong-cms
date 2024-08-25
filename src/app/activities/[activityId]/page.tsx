import ActivityPage from "@/components/pages/activities/ActivityPage";
import ActivityService from "@/services/activity.service";
import { redirect } from "next/navigation";

export default async function Page({ params: { activityId } }: { params: { activityId: string } }) {
    const activity = await ActivityService.getActivity(activityId);

    if (!activity) redirect('/activities');

    return <ActivityPage activity={activity} />
}