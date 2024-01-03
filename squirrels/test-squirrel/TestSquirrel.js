import Squirrel from '../../lib/Squirrel.js';
import { delay } from '../../shared/util.js';

export default class TestSquirrel extends Squirrel
{
    async run()
    {
        console.log('running');
        this.notifi.updateStatus('running');
        await delay(1000);
        this.notifi.updateStatus('ran');
        console.log('ran');
    }


    async save()
    {
        this.notifi.updateStatus('saving');
        await delay(1000);
        this.notifi.updateStatus('saved');
        this.notifi.complete();
    }


}
