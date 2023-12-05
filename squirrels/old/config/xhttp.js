import headers from "./headers.js";
import { config } from "dotenv";
const { parsed } = config();

export default {
    timeout: parsed?.timeout ?? 1000,
    headers: headers.default,
    useragent: parsed?.useragent ?? "SquirrelsUA/1.0",
    delayRange: {
        min: parsed?.delayRange?.min ?? 1000,
        max: parsed?.delayRange?.max ?? 3000,
    },
};
