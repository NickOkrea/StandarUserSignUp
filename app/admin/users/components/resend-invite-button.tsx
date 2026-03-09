'use client'

import { useState } from 'react'

export function ResendInviteButton({ userId, email }: { userId: string, email: string }) {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function handleResend() {
    setLoading(true)
    setMessage('')

    try {
      const res = await fetch('/api/profiles/resend-invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      })

      const data = await res.json()

      if (res.ok) {
        setMessage('✅ Invitación reenviada')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage(`❌ ${data.error}`)
      }
    } catch (error) {
      setMessage('❌ Error al reenviar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleResend}
        disabled={loading}
        className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
        title={`Reenviar invitación a ${email}`}
      >
        {loading ? '⏳' : '📧'} Reenviar
      </button>
      {message && (
        <span className="text-xs">{message}</span>
      )}
    </div>
  )
}
