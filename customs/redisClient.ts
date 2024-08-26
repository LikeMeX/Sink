import { createClient } from 'redis'

const runtimeConfig = useRuntimeConfig()

const redisClient = createClient({
  password: runtimeConfig.redisPassword,
  socket: {
    host: runtimeConfig.redisUrl,
    port: runtimeConfig.redisPort,
  },
}).on('error', err => console.log('Redis Client Error', err))

export default redisClient
