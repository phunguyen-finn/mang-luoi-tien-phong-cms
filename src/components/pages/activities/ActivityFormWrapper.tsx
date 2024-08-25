import ActivityService, { Activity } from "@/services/activity.service"
import ActivityForm from "./ActivityForm"
export default async function ActivityFormWrapper({ initialData, onSubmit, isAdmin }: { initialData?: Activity, onSubmit: any, isAdmin: boolean }) {
    const categories = await ActivityService.getCategories()
    return (
        <ActivityForm initialData={initialData} categories={categories} onSubmit={onSubmit} isAdmin={isAdmin} />
    )
}