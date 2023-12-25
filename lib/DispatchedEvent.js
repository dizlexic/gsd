import { instance as dispatcher } from './GSDispatcher.js';


/**
 * DispatchedEvent class
 * @type {DispatchedEvent}
 */
export class DispatchedEvent
{
    data= null;
    type= null;
    event = null;
    token = null;
    created_at = null;
    started_at = null;
    dispatcher = null;


    /**
     * DispatchedEvent constructor
     * @param event - Listener event from the API (JSON) see MissingSquirrels project for more info
     */
    constructor(event)
    {
        if (typeof event === 'string')
            event = JSON.parse(event);

        this.event = event;
        this.user_id = event?.user_uuid;
        this.id = event?.id;
        if (typeof event?.data == 'string') {
            try {
                event.data = JSON.parse(event.data);
            } catch (e) {}
        }
        this.data = event?.data;
        this.type = event?.type || 'stub';
        this.created_at = event?.created_at;
        this.token = event?.token;

        this.dispatcher = dispatcher;
    }


    _updates = []


    /**
     * Get an array of updates for this event
     * @returns {*[]}
     */
    get updates() {
        return this._updates;
    }


    /**
     * Set an update for this event
     * @param value
     */
    set updates(value) {
        this._updates.push(value);
    }


    _manager = null;


    /**
     * Get the Squirrel manager for this event
     * @returns {Promise<Squirrel>}
     */
    get manager() {
        return import(`../squirrels/${this.type}/index.js`);
    }


    /**
     * Call the run method on the Squirrel
     * @returns {Promise<*>}
     */
    async run() {
        this.started_at = new Date();
        const {Squirrel} = await this.manager;
        this._manager = new Squirrel(this);
        this.updates = this.dispatcher.updateStatus(this.event, 'running');
        return await this._manager.run();
    }


    /**
     * Call the save method on the Squirrel
     * @returns {Promise<*>}
     */
    async save() {
        this.updates = this.dispatcher.updateStatus(this.event, 'saving');
        return await this._manager.save();
    }
}
