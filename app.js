import * as dotenv from 'dotenv';
import { createClient } from 'redis';
import { DispatchedEvent } from './lib/DispatchedEvent.js';

const opts = dotenv.config({
    path: "./.env",
}).parsed;

const client = createClient({
    host: opts.REDIS_HOST,
    port: opts.REDIS_PORT,
});

client.subscribe(opts.IN_CHANNEL, (data) => {
    const event = new DispatchedEvent(data);
    return new Promise(async (resolve, reject) => {
        try {
            await event.run().then(() => event.save());
        } catch (e) {
            console.log("Redis Client Subscribe Err", e);
        }
        resolve(true);
    });
});

client.on("error", (err) => {
    console.log('Redis Client Error', err);
    // TODO:
    // new GSDispatcher({
    //     status: "error",
    // }).updateStatus("error", err),
});

client.on("connect", async () => {
    // TODO:
    // await new GSDispatcher({
    //     status: "information",
    // }).updateStatus("connected");
});

await client.connect().catch((err) => console.log("Redis Client Connect Err", err));

export default client;
