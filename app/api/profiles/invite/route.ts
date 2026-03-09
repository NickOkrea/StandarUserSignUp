import { NextRequest, NextResponse } from 'next/server'
import { inviteUser } from '@/lib/services/invitation'
import { inviteUserValidator } from '@/lib/validators/inviteUser'
import { isValidAgency } from '@/lib/services/agency'

/**
 * API Route para invitar usuarios
 * POST /api/profiles/invite
 * Body: { email: string, rol?: 'administrador' | 'chofer' | 'usuario' }
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const parsed = inviteUserValidator.safeParse(body)

    if (!parsed.success){
      return NextResponse.json(
        {error: parsed.error.issues[0].message},
        {status: 400}
      )
    }

    const { email, rol, agency_id } = parsed.data

    // Validar que la agencia exista
    const agencyExists = await isValidAgency(agency_id)

    if (!agencyExists) {
      return NextResponse.json(
        { error: 'Agencia no encontrada' },
        { status: 404 }
      )
    }

    const result = await inviteUser({ email, rol, agency_id })

    return NextResponse.json(result)

    

  } catch (error) {
    console.error('❌ Error en POST /api/profiles/invite:', error)
    return NextResponse.json(
      { error: 'Error al enviar invitación' },
      { status: 500 }
    )
  }
}
