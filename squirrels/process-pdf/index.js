import ProcessPDFSquirrel from './ProcessPDFSquirrel.js';
import { config } from './config.js';


export function Squirrel(dispatchedEvent)
{
    return new ProcessPDFSquirrel(dispatchedEvent, config);
}

