/**
 * Servicio de Invitaciones
 * Centraliza toda la lógica relacionada con invitar usuarios
 */

import { createClient } from '@supabase/supabase-js'
import { InviteUserDTO, InviteResponse, RolType } from '../models/Profile'

/**
 * Configuración de tablas por rol
 * Define qué tabla usar y qué campos iniciales crear para cada tipo de usuario
 */
const ROLE_TABLES: Record<RolType, { table: string; fields: Record<string, any> } | null> = {
  chofer: {
    table: 'user_driver',
    fields: {
      name: null,
      phone: null
    }
  },
  administrador: {
    table: 'user_admin',
    fields: {
      name: null,
      department: null
    }
  },
  usuario: null // Los usuarios comunes no tienen tabla adicional
}

/**
 * Crea un registro en la tabla específica según el rol del usuario
 * @param supabaseAdmin - Cliente de Supabase con permisos admin
 * @param rol - Rol del usuario
 * @param profileId - ID del perfil del usuario
 */
async function createRoleSpecificRecord(
  supabaseAdmin: any,
  rol: RolType,
  profileId: string
): Promise<void> {
  const roleConfig = ROLE_TABLES[rol]

  // Si el rol no tiene tabla específica, no hacer nada
  if (!roleConfig) {
    console.log(`ℹ️ El rol "${rol}" no requiere tabla adicional`)
    return
  }

  const { table, fields } = roleConfig

  try {
    const { error } = await supabaseAdmin
      .from(table)
      .insert({
        profile_id: profileId,
        ...fields
      })

    if (error) {
      console.error(`⚠️ Error al crear registro en ${table}:`, error)
    } else {
      console.log(`✅ Registro creado en ${table}`)
    }
  } catch (error) {
    console.error(`⚠️ Error al crear registro en ${table}:`, error)
  }
}

/**
 * Cliente Supabase Admin (Service Role)
 * Solo debe usarse en el servidor (API routes, Server Components)
 */
const getSupabaseAdmin = () => {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Faltan variables de entorno de Supabase')
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

/**
 * Invita a un usuario por email
 * @param email - Email del usuario a invitar
 * @param rol - Rol que tendrá el usuario (opcional)
 * @returns Resultado de la operación
 */
export async function inviteUser(data: InviteUserDTO): Promise<InviteResponse> {
  try {
    const { email, rol, agency_id } = data

    // Validar email
    if (!email || !email.includes('@')) {
      return {
        success: false,
        message: 'Email inválido',
        error: 'Email inválido'
      }
    }

    const supabaseAdmin = getSupabaseAdmin()

    // 1. Invitar usuario - Esto crea el registro en auth.users
    // El trigger automático crea el registro en profiles
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.inviteUserByEmail(email)

    if (authError) {
      console.error('❌ Error al invitar usuario:', authError)
      return {
        success: false,
        message: authError.message,
        error: authError.message
      }
    }

    if (!authData.user) {
      return {
        success: false,
        message: 'No se pudo crear el usuario',
        error: 'No se pudo crear el usuario'
      }
    }

    console.log('✅ Usuario invitado:', authData.user.id)

    // 2. Actualizar el profile con rol y agency_id
    // (El trigger ya creó el registro con email, ahora actualizamos los campos adicionales)
    const updateData: { rol?: RolType; agency_id: string } = {
      agency_id // agency_id es requerido
    }
    if (rol) updateData.rol = rol

    const { error: updateError } = await supabaseAdmin
      .from('profiles')
      .update(updateData)
      .eq('id', authData.user.id)

    if (updateError) {
      console.error('⚠️ Usuario creado pero error al actualizar profile:', updateError)
      // No retornamos error porque el usuario sí se creó
    } else {
      console.log('✅ Profile actualizado:', updateData)
    }

    // 3. Crear registro en la tabla específica según el rol
    // El administrador completará los datos específicos después
    if (rol) {
      await createRoleSpecificRecord(supabaseAdmin, rol, authData.user.id)
    }

    return {
      success: true,
      message: 'Invitación enviada correctamente',
      userId: authData.user.id
    }

  } catch (error) {
    console.error('❌ Error en inviteUser:', error)
    return {
      success: false,
      message: 'Error interno al enviar invitación',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

/**
 * Reenvía una invitación a un usuario existente
 * @param userId - ID del usuario
 * @returns Resultado de la operación
 */
export async function resendInvitation(userId: string): Promise<InviteResponse> {
  try {
    if (!userId) {
      return {
        success: false,
        message: 'User ID es requerido',
        error: 'User ID es requerido'
      }
    }

    const supabaseAdmin = getSupabaseAdmin()

    // 1. Obtener el email del usuario
    const { data: userData, error: userError } = await supabaseAdmin.auth.admin.getUserById(userId)
    
    if (userError || !userData.user || !userData.user.email) {
      console.error('❌ Error obteniendo usuario:', userError)
      return {
        success: false,
        message: 'Usuario no encontrado',
        error: 'Usuario no encontrado'
      }
    }

    // 2. Reenviar email de invitación
    const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(userData.user.email)

    if (error) {
      console.error('❌ Error reenviando invitación:', error)
      
      // Manejar rate limit
      if (error.status === 429) {
        return {
          success: false,
          message: 'Límite de emails alcanzado. Espera 1 hora e intenta de nuevo.',
          error: 'Rate limit exceeded'
        }
      }
      
      return {
        success: false,
        message: error.message,
        error: error.message
      }
    }

    console.log('✅ Invitación reenviada a:', userData.user.email)

    return {
      success: true,
      message: 'Invitación reenviada correctamente'
    }

  } catch (error) {
    console.error('❌ Error en resendInvitation:', error)
    return {
      success: false,
      message: 'Error al reenviar invitación',
      error: error instanceof Error ? error.message : 'Error desconocido'
    }
  }
}

/**
 * Obtiene un perfil por ID
 * @param userId - ID del usuario
 */
export async function getProfileById(userId: string) {
  const supabaseAdmin = getSupabaseAdmin()
  
  return await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
}

/**
 * Actualiza el rol de un perfil
 * @param userId - ID del usuario
 * @param rol - Nuevo rol
 */
export async function updateProfileRol(userId: string, rol: RolType) {
  const supabaseAdmin = getSupabaseAdmin()
  
  return await supabaseAdmin
    .from('profiles')
    .update({ rol })
    .eq('id', userId)
}
