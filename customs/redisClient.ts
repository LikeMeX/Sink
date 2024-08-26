import type { H3Event } from 'h3'
import { Redis } from '@upstash/redis/cloudflare'

export function redisClient(event: H3Event) {
  return new Redis({
    url: useRuntimeConfig(event).redisRestUrl,
    token: useRuntimeConfig(event).redisRestToken,
  })
}
