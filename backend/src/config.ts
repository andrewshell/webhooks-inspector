import 'dotenv/config'

export default {
  PORT: process.env.PORT ?? 3001,
  MONGO_URL: process.env.MONGO_URL ?? 'mongodb://localhost:27017/webhooks',
};
