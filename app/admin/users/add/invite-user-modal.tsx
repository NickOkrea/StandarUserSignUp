'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RolType } from '@/lib/models/Profile'
import { useState, useEffect } from 'react'
import { getAgencies } from '@/lib/services/agency'
import { Button } from '@/components/ui/button'
import { InviteUserAction } from '@/lib/services/invitationActions'
import { set } from 'zod'

interface Agency {
  id: string
  name: string
}

export function InviteUserModal() {
  const [email, setEmail] = useState('')
  const [rol, setRol] = useState<RolType | ''>('')
  const [agencyId, setAgencyId] = useState('')
  const [agencies, setAgencies] = useState<Agency[]>([])
  const [loadingAgencies, setLoadingAgencies] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState('')

  // Cargar agencias cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      loadAgencies()
    }
  }, [isOpen])

  async function loadAgencies() {
    setLoadingAgencies(true)
    try {
      const data = await getAgencies()
      setAgencies(data)
    } catch (error) {
      console.error('Error cargando agencias:', error)
    } finally {
      setLoadingAgencies(false)
    }
  }

  async function handleInvite(e: React.FormEvent){
    e.preventDefault()
    setLoading(true)
    setMessage('')

    if(!agencyId){
      setMessage('❌ Debes seleccionar una agencia')
      setLoading(false)
      return
    }

    try{
      const result = await InviteUserAction({
        email,
        rol: rol || undefined,
        agency_id: agencyId
      })

      if(result.success){
        setMessage('✅ Invitación enviada correctamente')
        setEmail('')
        setRol('')
        setAgencyId('')
        setTimeout(() => {
          setIsOpen(false)
          window.location.reload()
        }, 1500)
      }else {
        setMessage(`❌ Error: ${result.error}`)
      }
    } catch (error) {
      setMessage('❌ Error al enviar invitación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 rounded-lg bg-primary"
      >
        Invitar Usuario
      </Button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-xs flex items-center justify-center z-50" >
          <div className="bg-accent rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Enviar Solicitud al Usuario</h2>
            
            <form onSubmit={handleInvite}>
              <div className="mb-4">
                <Label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="usuario@ejemplo.com"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="mb-4">
                <Label className='block text-sm font-medium mb-2'>
                  Tipo de usuario <span className='text-red-500'>*</span>
                </Label>
                <Select value={rol} onValueChange={(value) => setRol(value as RolType)}>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder='Selecciona un rol' />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='administrador'>Administrador</SelectItem>
                    <SelectItem value='chofer'>Mecánico</SelectItem>
                    <SelectItem value='vendedor'>Vendedor</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="mb-4">
                <Label className='block text-sm font-medium mb-2'>
                  Agencia <span className='text-red-500'>*</span>
                </Label>
                <Select value={agencyId} onValueChange={setAgencyId} disabled={loadingAgencies} required>
                  <SelectTrigger className='w-full'>
                    <SelectValue placeholder={loadingAgencies ? 'Cargando agencias...' : 'Selecciona una agencia'} />
                  </SelectTrigger>
                  <SelectContent>
                    {agencies.length === 0 ? (
                      <SelectItem value='none' disabled>
                        No hay agencias disponibles
                      </SelectItem>
                    ) : (
                      agencies.map((agency) => (
                        <SelectItem key={agency.id} value={agency.id}>
                          {agency.name}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              {message && (
                <div className="mb-4 text-sm">
                  {message}
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex-1 px-4 py-2 rounded-lg"
                  variant="destructive"
                  disabled={loading}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg"
                  variant="outline"
                  disabled={loading}
                >
                  {loading ? 'Enviando...' : 'Enviar Invitación'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
