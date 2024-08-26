import hookGetLinkInRedis from '~/customs/hook.get.link'

export default eventHandler(async (event) => {
  const slug = getQuery(event).slug
  if (slug) {
    const { cloudflare } = event.context
    const { KV } = cloudflare.env
    const { metadata, value: link } = await KV.getWithMetadata(`link:${slug}`, {
      type: 'json',
    })
    if (link) {
      return {
        ...metadata,
        ...link,
      }
    }
    else {
      const linkRedis = await hookGetLinkInRedis(slug, event)
      if (linkRedis) {
        return {
          ...linkRedis,
        }
      }
    }
  }
  throw createError({
    status: 404,
    statusText: 'Not Found',
  })
})
