import type { H3Event } from 'h3'
import { redisClient } from './redisClient'

async function hookGetLinkInRedis(slug: string | number | true | Record<string, any>, event: H3Event) {
  try {
    const client = redisClient(event)

    const value = await client.get<string | null>(`link:${slug}`)
    if (value) {
      console.log('🚀 ~ hookGetLinkInRedis ~ value:', value)
      return JSON.parse(value)
    }
  }
  catch (error) {
    console.log('🚀 ~ hookGetLinkInRedis ~ error:', error)
    console.error(error)
  }
}

export default hookGetLinkInRedis
