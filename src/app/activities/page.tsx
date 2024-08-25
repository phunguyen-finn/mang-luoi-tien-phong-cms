
import ActivitiesLists from '@/components/pages/activities/ActivitiesLists';
import ActivityService, { ACTIVITY_STATUS } from '@/services/activity.service';
import { AUTHORITY } from '@/services/user.service';
import { headers } from 'next/headers';

export async function ActivitiesPage() {
    const [publishedData, draftData, archivedData] = await Promise.all([
        ActivityService.getActivitiesByStatus(ACTIVITY_STATUS.PUBLISHED),
        ActivityService.getActivitiesByStatus(ACTIVITY_STATUS.DRAFT),
        ActivityService.getActivitiesByStatus(ACTIVITY_STATUS.ARCHIVED),
    ]);
    const user = JSON.parse(headers().get('x-MLTP-Auth') as string);
    const isAdmin = user.authority === AUTHORITY.ADMINISTRATOR;


    return <ActivitiesLists publishedData={publishedData} draftData={draftData} archivedData={archivedData} isAdmin={isAdmin} />
}

export default ActivitiesPage;