import * as uuid from 'uuid';
import { endpoints } from 'squirrels-api';

export default class GenericSquirrel {

    _id = uuid.v4();
    _type = 'generic';
    _data = {};
    _name = '';
    _action = '';

    started = Date.now();

    async run() {
        console.log('GenericSquirrel running')
    }

    constructor(event) {
        this._data = event?.data ?? {};
        this._action = event ?? {};
        this._name = event?.name ?? 'no-name';
        this.started = Date.now();
    }
}
