import { LinkSchema } from '@/schemas/link'
import hookCreateLinkInRedis from '~/customs/hook.create.link'

export default eventHandler(async (event) => {
  const link = await readValidatedBody(event, LinkSchema.parse)

  const { cloudflare } = event.context
  const { KV } = cloudflare.env
  const existingLink = await KV.get(`link:${link.slug}`)
  await hookCreateLinkInRedis(event) // custom_hook
  if (existingLink) {
    throw createError({
      status: 409, // Conflict
      statusText: 'Link already exists',
    })
  }

  else {
    const expiration = getExpiration(event, link.expiration)

    await KV.put(`link:${link.slug}`, JSON.stringify(link), {
      expiration,
      metadata: {
        expiration,
      },
    })
    setResponseStatus(event, 201)
    return { link }
  }
})
