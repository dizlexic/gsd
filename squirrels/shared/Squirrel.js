import xhttp from '../../shared/xhttp.js';


export class Squirrel
{
    _axios = null
    _task = null

    constructor(dispatchedEvent) {
        this._task = dispatchedEvent
        this._axios = xhttp(this.token);
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
}

export default Squirrel;
