import Squirrel from '../shared/Squirrel.js';
import { delay } from '../shared/util.js';

export default class TestSquirrel extends Squirrel {
    async run() {
        console.log('running')
        await delay(1000)
        console.log('ran')
    }

    async save() {
        console.log('saving')
        await delay(1000)
        console.log('saved')
    }
}
