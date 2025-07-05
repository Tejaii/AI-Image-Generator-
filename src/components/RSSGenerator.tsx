'use client'

import React, { useState } from 'react'
import { Download, Copy, Eye, Code } from 'lucide-react'

const RSSGenerator: React.FC = () => {
  const [feedData, setFeedData] = useState({
    title: 'AI Avatar Studio - Latest Creations',
    description: 'Latest AI-generated avatars from our community',
    link: 'https://ai-avatar-studio.com',
    language: 'en',
    copyright: 'All rights reserved 2024, AI Avatar Studio'
  })

  const [format, setFormat] = useState<'rss' | 'atom' | 'json'>('rss')
  const [previewUrl, setPreviewUrl] = useState('')

  const generatePreviewUrl = () => {
    const baseUrl = window.location.origin
    const url = `${baseUrl}/api/rss?format=${format}`
    setPreviewUrl(url)
  }

  const handleCopyUrl = () => {
    if (previewUrl) {
      navigator.clipboard.writeText(previewUrl)
      alert('RSS URL copied to clipboard!')
    } else {
      generatePreviewUrl()
    }
  }

  const handleDownload = async () => {
    if (!previewUrl) {
      generatePreviewUrl()
      return
    }

    try {
      const response = await fetch(previewUrl)
      const content = await response.text()
      const blob = new Blob([content], { 
        type: format === 'json' ? 'application/json' : 'application/xml' 
      })
      const url = URL.createObjectURL(blob)
      
      const link = document.createElement('a')
      link.href = url
      link.download = `feed.${format === 'json' ? 'json' : 'xml'}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Download failed:', error)
      alert('Failed to download feed')
    }
  }

  const handlePreview = () => {
    if (!previewUrl) {
      generatePreviewUrl()
    }
    if (previewUrl) {
      window.open(previewUrl, '_blank')
    }
  }

  React.useEffect(() => {
    generatePreviewUrl()
  }, [format])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Generate RSS Feed
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Configure and generate RSS feeds for your AI Avatar Studio content
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Feed Title
              </label>
              <input
                type="text"
                value={feedData.title}
                onChange={(e) => setFeedData({ ...feedData, title: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={feedData.description}
                onChange={(e) => setFeedData({ ...feedData, description: e.target.value })}
                rows={3}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Website URL
              </label>
              <input
                type="url"
                value={feedData.link}
                onChange={(e) => setFeedData({ ...feedData, link: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={feedData.language}
                  onChange={(e) => setFeedData({ ...feedData, language: e.target.value })}
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                  <option value="pt">Portuguese</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Format
                </label>
                <select
                  value={format}
                  onChange={(e) => setFormat(e.target.value as 'rss' | 'atom' | 'json')}
                  className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                >
                  <option value="rss">RSS 2.0</option>
                  <option value="atom">Atom 1.0</option>
                  <option value="json">JSON Feed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Copyright
              </label>
              <input
                type="text"
                value={feedData.copyright}
                onChange={(e) => setFeedData({ ...feedData, copyright: e.target.value })}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                Generated Feed URL
              </h4>
              <div className="flex items-center gap-2 mb-3">
                <input
                  type="text"
                  value={previewUrl}
                  readOnly
                  className="flex-1 p-2 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400"
                />
                <button
                  onClick={handleCopyUrl}
                  className="p-2 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors"
                  title="Copy URL"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={handlePreview}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </button>
                <button
                  onClick={handleDownload}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download
                </button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
              <div className="flex items-start gap-2">
                <Code className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                    Integration Tips
                  </h4>
                  <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                    <li>• Add the feed URL to your website&apos;s &lt;head&gt; section</li>
                    <li>• Use RSS readers like Feedly or Inoreader to test</li>
                    <li>• Update feed content regularly for better engagement</li>
                    <li>• Consider adding images and rich content</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">
                Sample Feed Content
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                This feed currently includes 3 sample avatar items. In a production environment, 
                this would be connected to your database to show real user-generated content.
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-500">
                Items include: Professional headshots, Anime characters, Fantasy warriors
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RSSGenerator