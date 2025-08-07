
export interface Book {
  id: string
  title: string
  author: string
  price: number
  currency: string
  description: string
  imageUrl: string
  featured: boolean
  category: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface Tool {
  id: string
  name: string
  description: string
  category: string
  imageUrl: string
  linkUrl?: string | null
  featured: boolean
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface Portfolio {
  id: string
  title: string
  description: string
  imageUrl: string
  projectUrl?: string | null
  technologies: string[]
  category: string
  featured: boolean
  status: string
  startDate: Date
  endDate?: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface Contact {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: string
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  password: string
  role: string
  createdAt: Date
  updatedAt: Date
}
