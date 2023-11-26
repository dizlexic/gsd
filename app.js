import { createClient } from 'redis'
import * as dotenv from 'dotenv'
import squirrelEvent from './lib/SquirrelEvent.js'

const opts = dotenv.config({
  path: './.env',
}).parsed;

const client = createClient({ host: opts.REDIS_HOST,
                                                                                 port: opts.REDIS_PORT, })

client.subscribe('laravel_database_gsd', (event) => {
    let task = squirrelEvent(event);
    const result = Promise.resolve(task.save().then(() => task.run()));
})

client.on('error', err => console.log('Redis Client Err', err))
client.on( 'connect', async () => {
    console.log( 'Redis Client Connected' )
})

await client.connect()
    .catch(err => console.log('Redis Client Connect Err', err))

export default client

