
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 10)
  await prisma.user.upsert({
    where: { email: 'admin@ciberecus.mx' },
    update: {},
    create: {
      email: 'admin@ciberecus.mx',
      password: hashedPassword,
      role: 'admin',
    },
  })

  // Create test user (john@doe.com)
  const testPassword = await bcrypt.hash('johndoe123', 10)
  await prisma.user.upsert({
    where: { email: 'john@doe.com' },
    update: {},
    create: {
      email: 'john@doe.com',
      password: testPassword,
      role: 'admin',
    },
  })

  // Seed books from extracted data
  const books = [
    {
      title: 'Algoritmia Computacional',
      author: 'José Luis Pérez Resendiz',
      price: 210.00,
      description: 'Ideal para los iniciados en la programación de propósito general. Fundamentos de algoritmos y lógica de programación.',
      imageUrl: 'https://cdn.abacus.ai/images/cf00db39-117a-4765-a973-1775f386a9e3.png',
      category: 'Programación',
      featured: true
    },
    {
      title: 'Desarrollo de Aplicaciones Móviles con Flutter',
      author: 'José Luis Pérez Resendiz',
      price: 620.00,
      description: 'Lo que necesitas saber para crear tus propias aplicaciones móviles multiplataforma. Este libro nace de la necesidad de proporcionar una guía completa y práctica para aquellos que desean adentrarse en el fascinante mundo del desarrollo con Flutter.',
      imageUrl: 'https://cdn.abacus.ai/images/3b6ae7af-557a-46c3-a436-71ac68b365c1.png',
      category: 'Desarrollo Móvil',
      featured: true
    },
    {
      title: 'Creación de Portales Web',
      author: 'José Luis Pérez Resendiz',
      price: 434.66,
      description: 'Todas las bases y prácticas mínimas básicas para la formación FullStack (FrontEnd+BackEnd). Guía completa sobre desarrollo web, desde la planeación hasta la publicación, incluyendo PHP, MySQL y frameworks.',
      imageUrl: 'https://cdn.abacus.ai/images/3d8fe3fa-c06c-46d3-ad93-da90ae264765.png',
      category: 'Desarrollo Web',
      featured: true
    },
    {
      title: 'Programación Modular con Lenguaje C: C/C++',
      author: 'José Luis Pérez Resendiz',
      price: 360.00,
      description: 'Con ayuda de explicaciones y prácticas sencillas se introduce en el desarrollo de software con el lenguaje de programación C.',
      imageUrl: 'https://cdn.abacus.ai/images/ba336e95-3942-43ec-862e-2e7d2c5fa8ef.png',
      category: 'Programación',
      featured: false
    },
    {
      title: 'Programación OOP (Orientada a Objetos)',
      author: 'José Luis Pérez Resendiz',
      price: 410.00,
      description: 'Con ayuda de explicaciones y prácticas sencillas se van generando cambios de paradigma para evolucionar de la programación modular a la programación orientada a objetos, se emplea Lenguaje C, C++ y Java.',
      imageUrl: 'https://cdn.abacus.ai/images/732e7321-5781-44d8-83a3-415893fa04e6.png',
      category: 'Programación',
      featured: false
    },
    {
      title: 'Redes de Computadoras',
      author: 'José Luis Pérez Resendiz',
      price: 290.00,
      description: 'Con ayuda de explicaciones y prácticas sencillas se van realizando prácticas de laboratorio, necesarias para ser un muy buen constructor de redes.',
      imageUrl: 'https://cdn.abacus.ai/images/a1885440-b520-40c7-9b72-0045eed3ca3d.png',
      category: 'Networking',
      featured: false
    }
  ]

  for (const book of books) {
    await prisma.book.create({
      data: book,
    })
  }

  // Seed tools/services
  const tools = [
    {
      name: 'Desarrollo Web a la Medida',
      description: 'Creación de páginas y portales web para ofrecer servicios y/o productos. Diseños modernos, código limpio y completamente responsive.',
      category: 'Desarrollo Web',
      imageUrl: 'https://cdn.abacus.ai/images/1b9c5bcd-0519-430d-850a-5147e479bf0b.png',
      featured: true
    },
    {
      name: 'Aplicaciones Móviles',
      description: 'Desarrollo de aplicaciones para Android & iOS. Soluciones móviles integrando servicios web con paquetes integrados disponibles.',
      category: 'Desarrollo Móvil',
      imageUrl: 'https://cdn.abacus.ai/images/1b9c5bcd-0519-430d-850a-5147e479bf0b.png',
      featured: true
    },
    {
      name: 'Agentes IA para Proyectos Empresariales',
      description: 'Automatización de tareas y procesos, soporte inteligente de decisiones, chatbots, orquestación de flujos de trabajo y análisis de datos con IA.',
      category: 'Inteligencia Artificial',
      imageUrl: 'https://cdn.abacus.ai/images/1b9c5bcd-0519-430d-850a-5147e479bf0b.png',
      featured: true
    },
    {
      name: 'Networking y Seguridad',
      description: 'Administración de equipo activo, segmentación de redes via VLANs, configuración de seguridad de puertos, enlaces punto a punto y routeo.',
      category: 'Networking',
      imageUrl: 'https://cdn.abacus.ai/images/3c0c8384-4361-4b8a-a23d-666f8f8c87c4.png',
      featured: false
    },
    {
      name: 'Servicios VoIP',
      description: 'Implementación de servicios VoIP, Líneas y Oficinas Virtuales, CALL CENTER con Software Libre.',
      category: 'Comunicaciones',
      imageUrl: 'https://cdn.abacus.ai/images/3c0c8384-4361-4b8a-a23d-666f8f8c87c4.png',
      featured: false
    },
    {
      name: 'Tiendas Online',
      description: 'Desarrollo de plataformas para venta en línea de productos y servicios con diseño personalizado.',
      category: 'E-commerce',
      imageUrl: 'https://cdn.abacus.ai/images/3c0c8384-4361-4b8a-a23d-666f8f8c87c4.png',
      featured: false
    },
    {
      name: 'Capacitación en TI',
      description: 'Capacitación en sitio y online en programación web, escritorio y móvil (PHP, Java, Swift, Android).',
      category: 'Educación',
      imageUrl: 'https://cdn.abacus.ai/images/5b61fb87-8b65-4dbb-9ecf-a15593d300ec.png',
      featured: false
    },
    {
      name: 'Consultoría TI',
      description: 'Asesoría y soporte técnico en problemáticas de Tecnologías de Información.',
      category: 'Consultoría',
      imageUrl: 'https://cdn.abacus.ai/images/5b61fb87-8b65-4dbb-9ecf-a15593d300ec.png',
      featured: false
    }
  ]

  for (const tool of tools) {
    await prisma.tool.create({
      data: tool,
    })
  }

  // Seed portfolio projects
  const portfolioProjects = [
    {
      title: 'Portal E-commerce Completo',
      description: 'Desarrollo de plataforma de venta en línea con carrito de compras, pasarela de pagos y panel de administración completo.',
      imageUrl: 'https://cdn.abacus.ai/images/199254c2-959f-4b84-a09a-4e75e40203d6.png',
      technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML5', 'CSS3'],
      category: 'E-commerce',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-06-30'),
      featured: true
    },
    {
      title: 'Sistema de Gestión Empresarial',
      description: 'Aplicación web para gestión de inventarios, facturación y recursos humanos con reportes avanzados.',
      imageUrl: 'https://cdn.abacus.ai/images/cf810987-245a-4e4b-9c45-f77d18f2032e.png',
      technologies: ['PHP', 'MySQL', 'Chart.js', 'Bootstrap'],
      category: 'Gestión',
      startDate: new Date('2023-07-01'),
      endDate: new Date('2023-12-31'),
      featured: true
    },
    {
      title: 'App Móvil de Servicios',
      description: 'Aplicación multiplataforma para servicios locales con geolocalización y notificaciones push.',
      imageUrl: 'https://cdn.abacus.ai/images/11dffe8a-0ff9-4af3-b5f5-38bcfe1b546c.png',
      technologies: ['Flutter', 'Firebase', 'Google Maps API'],
      category: 'Móvil',
      startDate: new Date('2024-01-01'),
      featured: true
    }
  ]

  for (const project of portfolioProjects) {
    await prisma.portfolio.create({
      data: project,
    })
  }

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
