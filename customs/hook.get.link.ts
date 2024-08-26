import redisClient from './redisClient'

async function hookGetLinkInRedis(slug: string | number | true | Record<string, any>) {
  try {
    const client = await redisClient.connect()

    const value = await client.get(`link:${slug}`)
    await client.disconnect()
    if (value) {
      return JSON.parse(value)
    }
  }
  catch (error) {
    console.error(error)
  }
}

export default hookGetLinkInRedis
