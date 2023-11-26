import { createClient } from 'redis'
import * as dotenv from 'dotenv'
import squirrelEvent from './lib/SquirrelEvent.js'

const opts = dotenv.config({
  path: './.env',
}).parsed;

const client = createClient({ host: opts.REDIS_HOST,
                                                                                 port: opts.REDIS_PORT, })
client.subscribe('laravel_database_gsd', (event) => {
    try {
        let task = squirrelEvent(event);
        return new Promise((resolve, reject) => {
            task.save()
                .then((event) => resolve(event.run()))
                .catch(err => reject(err))
        })
    } catch (e) {
        console.log('Redis Client Subscribe Err', e)
    }

})

client.on('error', err => console.log('Redis Client Err', err))
client.on( 'connect', async () => {
    console.log( 'Redis Client Connected' )
})

await client.connect()
    .catch(err => console.log('Redis Client Connect Err', err))

export default client

