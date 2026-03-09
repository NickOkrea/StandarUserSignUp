import { InviteUserModal } from './add/invite-user-modal'
import { ResendInviteButton } from './components/resend-invite-button'
import { Profile } from '@/lib/models/Profile'
import DataTableUsers from './components/data-table-users'
import { getProfiles } from './services/GetProfiles'

export default async function UserPage() {
    
    const profiles = await getProfiles()
    

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