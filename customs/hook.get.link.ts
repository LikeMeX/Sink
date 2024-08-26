import { redisClient } from './redisClient'

async function hookGetLinkInRedis(slug: string | number | true | Record<string, any>) {
  try {
    const client = redisClient

    const value = await client.get<string | null>(`link:${slug}`)
    if (value) {
      return JSON.parse(value)
    }
  }
  catch (error) {
    console.error(error)
  }
}

export default hookGetLinkInRedis
