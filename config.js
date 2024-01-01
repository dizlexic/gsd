
const { env } = process

// default to dev environment if not specified
env.NODE_ENV ||= 'development'

export const config = {
    dev_mode: env.DEV_MODE === 'true' || env.NODE_ENV.startsWith('dev'),

    url: env.API_URL,
    port: env.API_PORT ?? 80,

    headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Squirrel/1.0.0',
    },

    redis: {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT,
        password: env.REDIS_PASSWORD,
        in_channel: env.REDIS_IN_CHANNEL,
        out_channel: env.REDIS_OUT_CHANNEL,
    },

    socket_url: env.SOCKET_URL,
    socket_port: env.SOCKET_PORT,

    env: env,
}

export default config;
