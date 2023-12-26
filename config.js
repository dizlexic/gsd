import * as dotenv from 'dotenv';

export const env = dotenv.config({
    path: './.env',
});

export const config = {
    dev_mode: (() => {
        const is_prod = process.env.NODE_ENV !== 'production' || process.env.NODE_ENV !== 'staging';
        const is_dev_mode = process.env?.DEV_MODE === 'true';
        return is_prod && is_dev_mode;
    })(),

    url: process.env?.API_URL,
    port: process.env?.API_PORT ?? 80,

    headers: {
        'Content-Type': 'application/json', 'User-Agent': 'Squirrel/1.0.0',
    },

    redis: {
        host: process.env?.REDIS_HOST,
        port: process.env?.REDIS_PORT,
        password: process.env?.REDIS_PASSWORD,
        in_channel: process.env?.REDIS_IN_CHANNEL,
        out_channel: process.env?.REDIS_OUT_CHANNEL,
    },

    env: env.parsed,
}

export default config;
