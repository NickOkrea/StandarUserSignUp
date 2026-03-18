"use server"

import { inviteUserValidator } from "../validators/inviteUser"
import { isValidAgency } from "./agency"
import { revalidatePath } from "next/cache"
import { inviteUser } from "./invitation"
import { RolType } from "../models/Profile"

export async function InviteUserAction(formData: {
    email: string
    rol?: RolType
    agency_id: string
}){

    try {

    const parsed = inviteUserValidator.safeParse(formData)

    if(!parsed.success){
        return {
            success: false,
            error: parsed.error.issues[0].message
        }
    }
    
    const { email, rol, agency_id } = parsed.data;

    const agencyExists = await isValidAgency(agency_id)
    if (!agencyExists) {
        return {
            success: false,
            error: 'Agencia no encontrada'
        }
    }

    const result = await inviteUser({ email, rol, agency_id })

    if(result.success){
        revalidatePath('/admin/users') // Revalidar la página de usuarios para mostrar el nuevo invitado
    }

    return result
    
} catch (error) {
    console.error('❌ Error en InviteUserAction:', error)
        return {
            success: false,
            error: 'Error al enviar invitación'
        }
    }
}

export async function resendInvitationAction(userId: string) {
    try {
        if (!userId) {
            return {
                success: false,
                error: 'User ID es requerido'
            }
        }

        const { resendInvitation } = await import('./invitation')
        const result = await resendInvitation(userId)

        if (result.success) {
            revalidatePath('/admin/users')
        }

        return result

    } catch (error) {
        console.error('❌ Error en resendInvitationAction:', error)
        return {
            success: false,
            error: 'Error al reenviar invitación'
        }
    }
}