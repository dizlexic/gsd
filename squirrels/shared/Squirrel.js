import xhttp from '../../shared/xhttp.js';
import { delay, delayRandom } from '../shared/util.js';


export class Squirrel
{
    _xhttp = null
    _task = null
    config = null

    constructor(dispatchedEvent) {
        this._task = dispatchedEvent
        this._xhttp = xhttp(dispatchedEvent?.token);
    }

    get token() {
        return this._task?.token;
    }

    get dispatcher() {
        return this._task?.dispatcher;
    }

    get event() {
        return this._task?.event;
    }

    async run() {
        console.log('Squirrel running');
    }

    async fetch(url, tries= 0) {

        if (this.config?.delayRange) {
            await delayRandom(
            this.config.delayRange.min,
            this.config.delayRange.max,
            );
        } else {
            await delay(5000);
        }

        const res = await this._xhttp.get(url.href)
            .catch(err=>console.log(err))

        console.log(res)
        if (res)
            return res.data;

        if (tries > 2 || tries < 0 )
            return null
        console.log( 'retrying' )
        return this.fetch(url, ++tries);
    }
}

export default Squirrel;
