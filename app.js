import { createClient } from "redis";
import { GSDispatcher } from "./lib/GSDispatcher.js";
import * as dotenv from "dotenv";

const opts = dotenv.config({
    path: "./.env",
}).parsed;

const client = createClient({
    host: opts.REDIS_HOST,
    port: opts.REDIS_PORT,
});

client.subscribe("laravel_database_gsd", (event) => {
    try {
        const data = JSON.parse(event);
        return new Promise((resolve, reject) => {
            const dispatcher = new GSDispatcher(data);
            dispatcher
                .dispatch()
                .then(() => {
                    resolve();
                    dispatcher.updateStatus("success");
                })
                .catch((err) => {
                    console.log("GSDispatcher Err", err);
                    resolve(); // idk k maybe?
                });
        });
    } catch (e) {
        console.log("Redis Client Subscribe Err", e);
    }
});

client.on("error", (err) =>
    new GSDispatcher({
        status: "error",
    }).updateStatus("error", err),
);

client.on("connect", async () => {
    await new GSDispatcher({
        status: "information",
    }).updateStatus("connected");
});

await client.connect().catch((err) => console.log("Redis Client Connect Err", err));

export default client;
