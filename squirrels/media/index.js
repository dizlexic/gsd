import MediaSquirrel from './MediaSquirrel.js';
import { config } from './config.js';


export function Squirrel (dispatchedEvent) {
    return new MediaSquirrel(dispatchedEvent, config);
}

