import GenericSquirrel from './GenericSquirrel.js';


export default class MediaSquirrel extends GenericSquirrel {
    _type = 'media';

    async run() {
        console.log('MediaSquirrel running')
    }
}
