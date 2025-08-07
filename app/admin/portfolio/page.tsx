
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Plus, Briefcase } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Gestionar Portafolio | Admin - Ciberecus Systems',
}

export default async function AdminPortfolioPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/admin/login')
  }

  const projects = await prisma.portfolio.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Briefcase className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold orbitron">Gestionar Portafolio</h1>
              <p className="text-muted-foreground">Administra proyectos del portafolio</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Link href="/admin/dashboard" className="btn-cyberpunk">
              Volver al Dashboard
            </Link>
            <Link href="/admin/portfolio/new" className="btn-cyberpunk">
              <Plus size={16} className="mr-2" />
              Nuevo Proyecto
            </Link>
          </div>
        </div>

        <div className="card-cyberpunk">
          <div className="grid gap-4">
            {projects?.length ? (
              projects.map((project) => (
                <div key={project?.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{project?.title}</h3>
                    <p className="text-sm text-muted-foreground">{project?.category}</p>
                    <p className="text-sm">{project?.description?.slice(0, 100)}...</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="destructive" size="sm">Eliminar</Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Briefcase className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay proyectos</h3>
                <p className="text-muted-foreground mb-4">Comienza agregando tu primer proyecto</p>
                <Link href="/admin/portfolio/new" className="btn-cyberpunk">
                  <Plus size={16} className="mr-2" />
                  Agregar Primer Proyecto
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
