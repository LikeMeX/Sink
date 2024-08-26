import redisClient from './redisClient'
import { LinkSchema } from '@/schemas/link'

async function hookCreateLinkInRedis(event: any) {
  try {
    const link = await readValidatedBody(event, LinkSchema.parse)
    const client = await redisClient.connect()

    const existingLink = await client.get(`link:${link.slug}`)
    if (existingLink) {
      console.log(`Link ${link.slug} already exists`)
    }
    else {
      await client.set(`link:${link.slug}`, JSON.stringify(link), {
        EX: 3 * 60 * 60,
      })
    }
    await client.disconnect()
  }
  catch (error) {
    console.error(error)
  }
}

export default hookCreateLinkInRedis
