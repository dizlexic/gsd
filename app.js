import { createClient } from 'redis';
import { DispatchedEvent } from './lib/DispatchedEvent.js';
import { config } from './config.js';
import { instance as dispatcher } from './lib/GSDispatcher.js';

const opts = {}

opts.host = config.redis.host;
opts.port = config.redis.port;

if (config.redis.password) {
    opts.password = config.redis.password;
}

// Create a redis client
const client = createClient(opts);

// Subscribe to the in channel
client.subscribe(config.redis.in_channel, async (data) => {
    try {
        const event = new DispatchedEvent(data)
        await event.run()
        await event.save()
    } catch (e) {
        console.log("Redis Client Subscribe Err", e);
        return false
    }
    return true
});

// Setup error update handler
client.on('error', async (err) => {
    console.log('error', err);
    await dispatcher.updateStatus({}, 'error');
});

// Setup connect update handler
client.on("connect", async () => {
    console.log('Redis Client Connected');
    await dispatcher.updateStatus({}, 'ready');
});

// Connect to the redis server
try {
    await client.connect();
} catch (e) {
    console.log("Redis Client Connect Err", e);
}

// Export the client
export default client;
