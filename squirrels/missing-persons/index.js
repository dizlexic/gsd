import MissingPersonsSquirrel from './MissingPersonsSquirrel.js';
import { config } from './config.js';


export function Squirrel (dispatchedEvent) {
    return new MissingPersonsSquirrel(dispatchedEvent, config);
}

