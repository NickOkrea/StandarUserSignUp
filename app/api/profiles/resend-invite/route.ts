import { NextRequest, NextResponse } from 'next/server'
import { resendInvitation } from '@/lib/services/invitation'
import { ResendInviteDTO } from '@/lib/models/Profile'

/**
 * API Route para reenviar invitaciones
 * POST /api/profiles/resend-invite
 * Body: { userId: string }
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = await req.json() as ResendInviteDTO

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID es requerido' },
        { status: 400 }
      )
    }

    console.log('🔄 Reenviando invitación a usuario:', userId)

    // Usar el servicio de invitación
    const result = await resendInvitation(userId)

    if (!result.success) {
      const status = result.error === 'Rate limit exceeded' ? 429 : 400
      return NextResponse.json(
        { error: result.error || result.message },
        { status }
      )
    }

    return NextResponse.json(result)

  } catch (error) {
    console.error('❌ Error en POST /api/profiles/resend-invite:', error)
    return NextResponse.json(
      { error: 'Error al reenviar invitación' },
      { status: 500 }
    )
  }
}
