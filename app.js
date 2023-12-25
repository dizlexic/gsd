import { createClient } from 'redis';
import { DispatchedEvent } from './lib/DispatchedEvent.js';
import { config } from './config.js';

const opts = {}

opts.host = config.redis.host;
opts.port = config.redis.port;

if (config.redis.password) {
    opts.password = config.redis.password;
}

// Create a redis client
const client = createClient(opts);

// Subscribe to the in channel
client.subscribe(config.redis.in_channel, (data) => {
    const event = new DispatchedEvent(data);
    return new Promise(async (resolve, reject) => {
        try {
            await event.run().then(() => event.save());
        } catch (e) {
            console.log("Redis Client Subscribe Err", e);
            reject(e);
        }
        resolve(true);
    });
});

// Setup error update handler
client.on("error", (err) => {
    console.log('Redis Client Error', err);
    // TODO:
    // new GSDispatcher({
    //     status: "error",
    // }).updateStatus("error", err),
});

// Setup connect update handler
client.on("connect", async () => {
    console.log('Redis Client Connected');
    // TODO:
    // await new GSDispatcher({
    //     status: "information",
    // }).updateStatus("connected");
});

// Connect to the redis server
try {
    await client.connect();
} catch (e) {
    console.log("Redis Client Connect Err", e);
}

// Export the client
export default client;
