
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { ArrowLeft, Wrench } from 'lucide-react'

export const metadata = {
  title: 'Nueva Herramienta | Admin - Ciberecus Systems',
}

export default async function NewToolPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-4 mb-8">
          <Link 
            href="/admin/tools" 
            className="p-2 rounded-lg hover:bg-muted/20 transition-colors"
          >
            <ArrowLeft className="h-6 w-6" />
          </Link>
          <div className="flex items-center space-x-3">
            <Wrench className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold orbitron">Nueva Herramienta</h1>
              <p className="text-muted-foreground">Agregar servicio/herramienta</p>
            </div>
          </div>
        </div>

        <div className="card-cyberpunk">
          <div className="text-center py-12">
            <Wrench className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Funcionalidad CRUD en Desarrollo</h3>
            <p className="text-muted-foreground mb-4">
              Esta sección estará disponible en una futura actualización.
            </p>
            <Link href="/admin/tools" className="btn-cyberpunk">
              Volver a Herramientas
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
