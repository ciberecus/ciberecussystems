
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { MessageCircle, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Gestionar Contactos | Admin - Ciberecus Systems',
}

export default async function AdminContactsPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/admin/login')
  }

  const contacts = await prisma.contact.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <MessageCircle className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold orbitron">Gestionar Contactos</h1>
              <p className="text-muted-foreground">Administra mensajes de contacto</p>
            </div>
          </div>
          
          <Link href="/admin/dashboard" className="btn-cyberpunk">
            Volver al Dashboard
          </Link>
        </div>

        <div className="card-cyberpunk">
          <div className="grid gap-4">
            {contacts?.length ? (
              contacts.map((contact) => (
                <div key={contact?.id} className="p-4 bg-muted/20 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{contact?.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Mail size={14} />
                        <span>{contact?.email}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        contact?.status === 'new' 
                          ? 'bg-yellow-500/20 text-yellow-400' 
                          : 'bg-green-500/20 text-green-400'
                      }`}>
                        {contact?.status === 'new' ? 'Nuevo' : 'Respondido'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {contact?.createdAt ? new Date(contact.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="font-medium text-sm mb-1">Asunto: {contact?.subject}</p>
                    <p className="text-sm text-muted-foreground">{contact?.message}</p>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Marcar como Leído</Button>
                    <Button variant="outline" size="sm">Responder</Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <MessageCircle className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay mensajes</h3>
                <p className="text-muted-foreground">Los mensajes de contacto aparecerán aquí</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
