'use client'

import { ThemeProvider } from '@/contexts/ThemeContext'
import Layout from '@/components/Layout'
import AvatarGenerator from '@/components/AvatarGenerator'

export default function Home() {
  return (
    <ThemeProvider>
      <Layout>
        <AvatarGenerator />
      </Layout>
    </ThemeProvider>
  )
}