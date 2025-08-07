
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Plus, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const metadata = {
  title: 'Gestionar Libros | Admin - Ciberecus Systems',
}

export default async function AdminBooksPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/admin/login')
  }

  const books = await prisma.book.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold orbitron">Gestionar Libros</h1>
              <p className="text-muted-foreground">Administra el catálogo de libros</p>
            </div>
          </div>
          
          <div className="flex space-x-4">
            <Link href="/admin/dashboard" className="btn-cyberpunk">
              Volver al Dashboard
            </Link>
            <Link href="/admin/books/new" className="btn-cyberpunk">
              <Plus size={16} className="mr-2" />
              Nuevo Libro
            </Link>
          </div>
        </div>

        <div className="card-cyberpunk">
          <div className="grid gap-4">
            {books?.length ? (
              books.map((book) => (
                <div key={book?.id} className="flex items-center justify-between p-4 bg-muted/20 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-semibold">{book?.title}</h3>
                    <p className="text-sm text-muted-foreground">{book?.author} • {book?.category}</p>
                    <p className="text-sm text-primary font-semibold">${book?.price?.toFixed(2)} {book?.currency}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Editar</Button>
                    <Button variant="destructive" size="sm">Eliminar</Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No hay libros</h3>
                <p className="text-muted-foreground mb-4">Comienza agregando tu primer libro</p>
                <Link href="/admin/books/new" className="btn-cyberpunk">
                  <Plus size={16} className="mr-2" />
                  Agregar Primer Libro
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
