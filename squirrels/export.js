import GenericSquirrel from './GenericSquirrel.js';
import MediaSquirrel from './MediaSquirrel.js';

const types = {
    generic: GenericSquirrel,
    media: MediaSquirrel,
}
export default function createFromEvent(event) {
    const squirrel = types[event?.type] ?? GenericSquirrel;
    return new squirrel(event);
}
