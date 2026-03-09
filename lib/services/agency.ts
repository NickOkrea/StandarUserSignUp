import { createClient } from '../supabase/server'

export interface Agency {
    id: string
    name: string
}

export async function isValidAgency(agency_id: string): Promise<boolean> {
    if (!agency_id) return false

    const supabase = await createClient()

    const { data, error } = await supabase
        .from('agencies')
        .select('id')
        .eq('id', agency_id)
        .maybeSingle()

    if (error || !data) {
        return false
    }

    return true
}

export async function getAgencies(): Promise<Agency[]> {
    try {
        const supabase = await createClient()

        const { data, error } = await supabase
            .from('agencies')
            .select('id, name')
            .order('name', { ascending: true })

        if (error) {
            console.error('❌ Error fetching agencies:', error)
            return []
        }

        return data || []
    } catch (error) {
        console.error('❌ Error in getAgencies:', error)
        return []
    }
}