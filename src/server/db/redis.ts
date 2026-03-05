import { Redis } from "ioredis";
import { SERVER_ENV } from "../env";

const redis = new Redis({
  username: SERVER_ENV.REDIS_USERNAME,
  password: SERVER_ENV.REDIS_PASSWORD,
  host: SERVER_ENV.REDIS_HOST,
  port: SERVER_ENV.REDIS_PORT,
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    const delay = Math.min(times * 200, 5000);
    console.log(`Redis reconnecting in ${delay}ms (attempt ${times})...`);
    return delay;
  },
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err.message);
});

redis.on("connect", () => {
  console.log("Redis connected");
});

export default redis;
