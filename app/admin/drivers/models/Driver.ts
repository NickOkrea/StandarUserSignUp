export type RolType = 'administrador' | 'chofer' | 'vendedor'

export interface Driver {
  id: string              // UUID - Coincide con auth.users.id
  email: string          // Email del usuario
  rol: RolType | null     // Rol del usuario en el sistema
  // Campos de user_driver (pueden no existir si el admin no los ha completado)
  name?: string | null    // Nombre del chofer (de user_driver)
  phone?: number | null   // Teléfono del chofer (de user_driver)
}
