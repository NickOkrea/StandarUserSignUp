export type RolType = 'administrador' | 'chofer' | 'usuario'

export interface Driver {
  id: string              // UUID - Coincide con auth.users.id
  email: string          // Email del usuario
  rol: RolType | null     // Rol del usuario en el sistema
  // Campos de user_driver (pueden no existir si el admin no los ha completado)
  name?: string           // Nombre del chofer (de user_driver)
  phone?: number          // Teléfono del chofer (de user_driver)
}
