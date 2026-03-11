import { InviteUserModal } from './add/invite-user-modal'
import { ResendInviteButton } from './components/resend-invite-button'
import { Profile } from '@/lib/models/Profile'
import DataTableUsers from './components/data-table-users'
import { getProfiles } from './services/GetProfiles'
import { getCurrentUser, getCurrentProfile } from '@/lib/services/auth'

export default async function UserPage() {
    // ✅ Obtener datos una sola vez (no dentro del servicio)
    const { data: { user } } = await getCurrentUser();
    
    if (!user) return <div>No autorizado</div>;
    
    const { data: profile } = await getCurrentProfile(user.id);
    const agencyId = profile?.agency_id || '';
    
    const profiles = await getProfiles(agencyId);

    return (
        <div className="p-3">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Perfiles</h1>
                <InviteUserModal />
            </div>

            <DataTableUsers profiles={profiles} />
        </div>
    )
}