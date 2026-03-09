export default function AuthErrorPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-bold">Error de Autenticación</h1>
            <p className="text-balance text-muted-foreground">
              Ha ocurrido un error durante el proceso de autenticación.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <a 
              href="/auth/login"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Volver al inicio de sesión
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
