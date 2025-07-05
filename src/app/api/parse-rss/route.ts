import { NextRequest, NextResponse } from 'next/server'
import Parser from 'rss-parser'

const parser = new Parser({
  customFields: {
    feed: ['language', 'copyright'],
    item: ['media:content', 'enclosure', 'dc:creator']
  }
})

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json(
        { error: 'RSS URL is required' },
        { status: 400 }
      )
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    const feed = await parser.parseURL(url)
    
    // Transform the feed data to a cleaner format
    const cleanFeed = {
      title: feed.title,
      description: feed.description,
      link: feed.link,
      language: feed.language,
      lastBuildDate: feed.lastBuildDate,
      pubDate: feed.pubDate,
      copyright: feed.copyright,
      generator: feed.generator,
      itemCount: feed.items.length,
      items: feed.items.slice(0, 20).map(item => ({
        title: item.title,
        link: item.link,
        description: item.contentSnippet || item.description,
        pubDate: item.pubDate,
        author: item.creator || item['dc:creator'],
        guid: item.guid,
        categories: item.categories,
        enclosure: item.enclosure,
        content: item.content
      }))
    }

    return NextResponse.json(cleanFeed)
  } catch (error) {
    console.error('RSS parsing error:', error)
    return NextResponse.json(
      { error: 'Failed to parse RSS feed. Please check the URL and try again.' },
      { status: 500 }
    )
  }
}