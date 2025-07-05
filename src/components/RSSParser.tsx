'use client'

import React, { useState } from 'react'
import { Search, ExternalLink, Calendar, User, AlertCircle, Loader2 } from 'lucide-react'

interface RSSItem {
  title: string
  link: string
  description: string
  pubDate: string
  author?: string
  guid: string
  categories?: string[]
}

interface RSSFeed {
  title: string
  description: string
  link: string
  language?: string
  lastBuildDate?: string
  pubDate?: string
  copyright?: string
  generator?: string
  itemCount: number
  items: RSSItem[]
}

const RSSParser: React.FC = () => {
  const [url, setUrl] = useState('')
  const [feed, setFeed] = useState<RSSFeed | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const sampleFeeds = [
    'https://feeds.feedburner.com/oreilly/radar',
    'https://rss.cnn.com/rss/edition.rss',
    'https://feeds.bbci.co.uk/news/rss.xml',
    'https://techcrunch.com/feed/',
    'https://www.reddit.com/r/technology/.rss'
  ]

  const handleParse = async () => {
    if (!url.trim()) {
      setError('Please enter an RSS URL')
      return
    }

    setLoading(true)
    setError('')
    setFeed(null)

    try {
      const response = await fetch('/api/parse-rss', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to parse RSS feed')
      }

      setFeed(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Parse RSS Feed
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Enter an RSS feed URL to parse and display its contents
        </p>

        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/feed.xml"
              className="flex-1 p-3 rounded-xl border border-gray-300 dark:border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-300 dark:focus:ring-purple-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            />
            <button
              onClick={handleParse}
              disabled={loading}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Parse
            </button>
          </div>

          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Try these sample feeds:</p>
            <div className="flex flex-wrap gap-2">
              {sampleFeeds.map((sampleUrl) => (
                <button
                  key={sampleUrl}
                  onClick={() => setUrl(sampleUrl)}
                  className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {new URL(sampleUrl).hostname}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-red-700 dark:text-red-400">{error}</p>
        </div>
      )}

      {feed && (
        <div className="space-y-6">
          <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-xl">
            <h4 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {feed.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{feed.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Website:</span>
                <a 
                  href={feed.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="ml-2 text-purple-600 dark:text-purple-400 hover:underline"
                >
                  {feed.link}
                </a>
              </div>
              <div>
                <span className="font-medium text-gray-700 dark:text-gray-300">Items:</span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">{feed.itemCount}</span>
              </div>
              {feed.language && (
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Language:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">{feed.language}</span>
                </div>
              )}
              {feed.lastBuildDate && (
                <div>
                  <span className="font-medium text-gray-700 dark:text-gray-300">Last Updated:</span>
                  <span className="ml-2 text-gray-600 dark:text-gray-400">
                    {formatDate(feed.lastBuildDate)}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
              Recent Items ({feed.items.length})
            </h4>
            <div className="space-y-4">
              {feed.items.map((item, index) => (
                <div 
                  key={item.guid || index}
                  className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h5 className="font-medium text-gray-800 dark:text-gray-200 flex-1 mr-4">
                      {item.title}
                    </h5>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex-shrink-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  
                  {item.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
                      {item.description}
                    </p>
                  )}
                  
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                    {item.pubDate && (
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(item.pubDate)}
                      </div>
                    )}
                    {item.author && (
                      <div className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {item.author}
                      </div>
                    )}
                  </div>
                  
                  {item.categories && item.categories.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.categories.slice(0, 3).map((category, catIndex) => (
                        <span
                          key={catIndex}
                          className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded-full"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RSSParser