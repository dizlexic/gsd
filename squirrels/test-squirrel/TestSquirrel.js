import Squirrel from '../shared/Squirrel.js'
import { delay } from '../shared/util.js'
export default class TestSquirrel extends Squirrel {
    constructor (token, dispatcher) {
        super(token, dispatcher)
        this.name = 'TestSquirrel'
    }


    async run() {
        console.log('TestSquirrel running');
        let status = await this.dispatcher.updateStatus('running')

        await delay(1000)

        await this.save()
    }

    async save() {
        console.log('TestSquirrel saving');
        await this.dispatcher.updateStatus('saving')
        await delay(1000)
        await this.dispatcher.updateStatus('done')
    }
}
