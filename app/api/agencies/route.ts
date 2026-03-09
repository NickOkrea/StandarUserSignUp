import { NextResponse } from 'next/server'
import { getAgencies } from '@/lib/services/agency'

/**
 * API Route para obtener agencias
 * GET /api/agencies
 */
export async function GET() {
  try {
    const agencies = await getAgencies()
    return NextResponse.json(agencies)
  } catch (error) {
    console.error('❌ Error en GET /api/agencies:', error)
    return NextResponse.json(
      { error: 'Error al obtener agencias' },
      { status: 500 }
    )
  }
}
