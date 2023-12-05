import env from 'dotenv'

env.config({
    path: './.env',
})

export const config = {
    url: process.env.API_URL,
    port: process.env?.API_PORT ?? 80,
}
