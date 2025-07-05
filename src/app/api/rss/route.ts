import { NextRequest, NextResponse } from 'next/server'
import { Feed } from 'feed'

// Sample avatar data - in a real app, this would come from a database
const sampleAvatars = [
  {
    id: '1',
    prompt: 'Professional headshot of a CEO with blonde hair',
    imageUrl: 'https://image.pollinations.ai/prompt/realistic%20style%20Professional%20headshot%20of%20a%20CEO%20with%20blonde%20hair',
    style: 'realistic',
    createdAt: new Date('2024-01-15T10:30:00Z'),
    author: 'AI Avatar Studio'
  },
  {
    id: '2',
    prompt: 'Anime character with purple hair and cat ears',
    imageUrl: 'https://image.pollinations.ai/prompt/anime%20style%20character%20with%20purple%20hair%20and%20cat%20ears',
    style: 'anime',
    createdAt: new Date('2024-01-14T15:45:00Z'),
    author: 'AI Avatar Studio'
  },
  {
    id: '3',
    prompt: 'Fantasy warrior with golden armor',
    imageUrl: 'https://image.pollinations.ai/prompt/fantasy%20warrior%20with%20golden%20armor',
    style: 'realistic',
    createdAt: new Date('2024-01-13T09:20:00Z'),
    author: 'AI Avatar Studio'
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const format = searchParams.get('format') || 'rss'

  const feed = new Feed({
    title: 'AI Avatar Studio - Latest Creations',
    description: 'Latest AI-generated avatars from our community',
    id: 'https://ai-avatar-studio.com/',
    link: 'https://ai-avatar-studio.com/',
    language: 'en',
    image: 'https://ai-avatar-studio.com/logo.png',
    favicon: 'https://ai-avatar-studio.com/favicon.ico',
    copyright: `All rights reserved ${new Date().getFullYear()}, AI Avatar Studio`,
    updated: new Date(),
    generator: 'AI Avatar Studio RSS Generator',
    feedLinks: {
      json: 'https://ai-avatar-studio.com/api/rss?format=json',
      atom: 'https://ai-avatar-studio.com/api/rss?format=atom',
      rss: 'https://ai-avatar-studio.com/api/rss?format=rss',
    },
    author: {
      name: 'AI Avatar Studio',
      email: 'hello@ai-avatar-studio.com',
      link: 'https://ai-avatar-studio.com/'
    }
  })

  // Add items to feed
  sampleAvatars.forEach(avatar => {
    feed.addItem({
      title: `New ${avatar.style} avatar: ${avatar.prompt}`,
      id: `https://ai-avatar-studio.com/avatar/${avatar.id}`,
      link: `https://ai-avatar-studio.com/avatar/${avatar.id}`,
      description: `A ${avatar.style} style avatar: ${avatar.prompt}`,
      content: `
        <div>
          <img src="${avatar.imageUrl}" alt="${avatar.prompt}" style="max-width: 400px; border-radius: 12px;" />
          <p><strong>Style:</strong> ${avatar.style}</p>
          <p><strong>Prompt:</strong> ${avatar.prompt}</p>
        </div>
      `,
      author: [
        {
          name: avatar.author,
          email: 'hello@ai-avatar-studio.com',
          link: 'https://ai-avatar-studio.com/'
        }
      ],
      date: avatar.createdAt,
      image: avatar.imageUrl
    })
  })

  // Return appropriate format
  switch (format) {
    case 'json':
      return new NextResponse(feed.json1(), {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600'
        }
      })
    case 'atom':
      return new NextResponse(feed.atom1(), {
        headers: {
          'Content-Type': 'application/atom+xml',
          'Cache-Control': 'public, max-age=3600'
        }
      })
    default:
      return new NextResponse(feed.rss2(), {
        headers: {
          'Content-Type': 'application/rss+xml',
          'Cache-Control': 'public, max-age=3600'
        }
      })
  }
}