import type { H3Event } from 'h3'
import { redisClient } from './redisClient'
import { LinkSchema } from '@/schemas/link'

async function hookCreateLinkInRedis(event: H3Event) {
  try {
    const link = await readValidatedBody(event, LinkSchema.parse)
    const client = redisClient(event)

    const existingLink = await client.get(`link:${link.slug}`)
    if (existingLink) {
      console.log(`Link ${link.slug} already exists`)
    }
    else {
      await client.set(`link:${link.slug}`, JSON.stringify(link), {
        ex: 3 * 60 * 60,
      })
    }
  }
  catch (error) {
    console.error(error)
  }
}

export default hookCreateLinkInRedis
