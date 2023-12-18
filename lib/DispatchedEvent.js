import { instance as dispatcher } from './GSDispatcher.js';


export class DispatchedEvent
{
    data= null;
    type= null;
    event = null;
    token = null;
    created_at = null;
    started_at = null;
    dispatcher = null;


    constructor(event)
    {
        if (typeof event === 'string')
            event = JSON.parse(event);

        console.log('Event', event);
        this.event = event;
        this.user_id = event?.user_uuid;
        this.id = event?.id;
        this.data = event?.data;
        this.type = event?.type || 'stub';
        this.created_at = event?.created_at;
        this.token = event?.token;

        this.dispatcher = dispatcher;
    }

    _manager = null;

    /*
     * manager getter
     * @return {Promise<Squirrel>}
     */
    get manager() {
        return import(`../squirrels/${this.type}/index.js`);
    }


    _updates = []


    get updates() {
        return this._updates;
    }


    set updates(value) {
        this._updates.push(value);
    }


    async run() {
        this.started_at = new Date();
        const {Squirrel} = await this.manager;
        this._manager = new Squirrel(this);
        this.updates = this.dispatcher.updateStatus(this.event, 'running');
        return await this._manager.run();
    }


    async save() {
        this.updates = this.dispatcher.updateStatus(this.event, 'saving');
        return await this._manager.save();
    }
}
