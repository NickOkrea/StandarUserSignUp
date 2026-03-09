/**
 * Modelo de datos para la tabla profiles de Supabase
 * Corresponde a la estructura: profiles (id, email, rol)
 */

export type RolType = 'administrador' | 'chofer' | 'usuario'

export interface Profile {
  id: string              // UUID - Coincide con auth.users.id
  email: string           // Email del usuario
  rol: RolType | null     // Rol del usuario en el sistema
  agency_id?: string      // ID de la agencia a la que pertenece el usuario
  created_at?: string     // Timestamp de creación
  updated_at?: string     // Timestamp de actualización
}

/**
 * DTO para crear una invitación
 */
export interface InviteUserDTO {
  email: string
  rol?: RolType
  agency_id: string
}

/**
 * DTO para reenviar invitación
 */
export interface ResendInviteDTO {
  userId: string
  agency_id?: string
}

/**
 * Respuesta de la API de invitación
 */
export interface InviteResponse {
  success: boolean
  message: string
  userId?: string
  error?: string
}

/**
 * Type guard para validar si un string es un RolType válido
 */
export function isValidRol(rol: string): rol is RolType {
  return ['administrador', 'chofer', 'usuario'].includes(rol)
}
