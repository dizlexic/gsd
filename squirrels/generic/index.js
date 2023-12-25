import GenericSquirrel from './GenericSquirrel.js';
import { config } from './config.js';


export function Squirrel(dispatchedEvent)
{
    return new GenericSquirrel(dispatchedEvent, config);
}

