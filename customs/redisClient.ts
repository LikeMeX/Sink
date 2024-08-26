import { createClient } from 'redis'

const redisClient = createClient({
  password: process.env.NUXT_REDIS_PASSWORD,
  socket: {
    host: process.env.NUXT_REDIS_URL,
    port: Number(process.env.NUXT_REDIS_PORT || 11373),
  },
}).on('error', err => console.log('Redis Client Error', err))

export default redisClient
