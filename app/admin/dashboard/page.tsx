
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import AdminDashboard from '@/components/admin/admin-dashboard'

export const metadata = {
  title: 'Panel de Administración | Ciberecus Systems',
  description: 'Gestiona libros, herramientas y proyectos del portafolio',
}

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/admin/login')
  }

  // Fetch dashboard data
  const [books, tools, portfolio, contacts] = await Promise.all([
    prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    }),
    prisma.tool.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    }),
    prisma.portfolio.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    }),
    prisma.contact.findMany({
      where: { status: 'new' },
      orderBy: { createdAt: 'desc' },
      take: 5
    })
  ])

  // Get counts
  const stats = {
    totalBooks: await prisma.book.count(),
    totalTools: await prisma.tool.count(),
    totalProjects: await prisma.portfolio.count(),
    newContacts: await prisma.contact.count({ where: { status: 'new' } })
  }

  return (
    <AdminDashboard 
      session={session}
      stats={stats}
      recentBooks={books}
      recentTools={tools}
      recentProjects={portfolio}
      newContacts={contacts}
    />
  )
}
