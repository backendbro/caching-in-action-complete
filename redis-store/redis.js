
const Redis = require("ioredis")
const dotenv = require('dotenv')

dotenv.config()

const redisClient = () => {
  const redis = new Redis(process.env.redis_url)

  redis.on("error", (err) => {
    console.log(`Redis crashed: ${err.message}`)
  })
 
  redis.on("connect", () => {
    console.log(`Redis started on ${redis.options.host}`)
  })
 
  return redis
}

module.exports = redisClient()