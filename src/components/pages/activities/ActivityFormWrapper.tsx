import ActivityService, { Activity } from "@/services/activity.service"
import ActivityForm from "./ActivityForm"

export default async function ActivityFormWrapper({ initialData, onSubmit }: { initialData?: Activity, onSubmit: any }) {
    const categories = await ActivityService.getCategory()
    return (
        <ActivityForm initialData={initialData} categories={categories} onSubmit={onSubmit} />
    )
}