import { createClient } from 'redis'
import { GSDispatcher } from './lib/GSDispatcher.js'
import * as dotenv from 'dotenv'

const opts = dotenv.config({
  path: './.env',
}).parsed;

const client = createClient({ host: opts.REDIS_HOST,
                                                                                 port: opts.REDIS_PORT, })
client.subscribe('laravel_database_gsd', (event) => {
    try {
        return new Promise((resolve, reject) => {
            const dispatcher = new GSDispatcher(event)
            dispatcher.dispatch()
                .then(() => {
                    resolve()
                    dispatcher.updateStatus('success')
                })
                .catch((err) => {
                    console.log('GSDispatcher Err', err)
                    reject(dispatcher.updateStatus('error'))
                })
        })
    } catch (e) {
        console.log('Redis Client Subscribe Err', e)
    }
})

client.on('error', err => new GSDispatcher().updateStatus('error', err))

client.on( 'connect', async () => {
    new GSDispatcher().updateStatus('connected')
})

await client.connect()
    .catch(err => console.log('Redis Client Connect Err', err))

export default client

