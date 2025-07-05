'use client'

import { useState } from 'react'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Layout from '@/components/Layout'
import RSSParser from '@/components/RSSParser'
import RSSGenerator from '@/components/RSSGenerator'
import { Rss, Code, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function RSSToolsPage() {
  const [activeTab, setActiveTab] = useState<'parser' | 'generator'>('parser')

  return (
    <ThemeProvider>
      <Layout>
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <Link 
              href="/"
              className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors duration-200 mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Avatar Studio
            </Link>
            
            <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              RSS Tools
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              Parse existing RSS feeds or generate new ones for your content
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80 mb-8">
            <div className="flex space-x-1 bg-gray-100 dark:bg-gray-900 rounded-2xl p-1 mb-6">
              <button
                onClick={() => setActiveTab('parser')}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === 'parser'
                    ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Rss className="h-5 w-5 mr-2" />
                RSS Parser
              </button>
              <button
                onClick={() => setActiveTab('generator')}
                className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === 'generator'
                    ? 'bg-white dark:bg-gray-800 text-purple-600 dark:text-purple-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
              >
                <Code className="h-5 w-5 mr-2" />
                RSS Generator
              </button>
            </div>

            {activeTab === 'parser' ? <RSSParser /> : <RSSGenerator />}
          </div>
        </div>
      </Layout>
    </ThemeProvider>
  )
}