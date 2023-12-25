import xhttp from '../shared/xhttp.js';
import { delay, delayRandom } from '../shared/util.js';
import { config as defaultConfig } from '../config.js';


/**
 * Base class for all Squirrels
 * @type {Squirrel}
 *
 * @params {DispatchedEvent} dispatchedEvent - DispatchedEvent instance
 *
 * @property {string} token - API bearer token
 * @property {GSDispatcher} dispatcher - GSDispatcher instance
 * @property {string} event - Event name
 * @property {Object} config - Squirrel config object
 * @property {Object} _xhttp - xhttp instance
 * @property {DispatchedEvent} _task - DispatchedEvent instance
 */
export class Squirrel
{
    _xhttp = null
    _task = null
    config = null


    constructor(dispatchedEvent, config = defaultConfig)
    {
        this._task = dispatchedEvent
        this._xhttp = xhttp(dispatchedEvent?.token);
        this.config = config;
    }

    get token() {
        return this._task?.token ?? null;
    }

    get dispatcher() {
        return this._task?.dispatcher ?? null;
    }

    get event() {
        return this._task?.event ?? 'unknown';
    }


    /**
     * Run hook for the Squirrel
     * @returns {Promise<void>}
     */
    async run() {
        console.log('Squirrel running');
    }


    /**
     * Cancel hook for the Squirrel
     * @returns {Promise<void>}
     */
    async cancel() {
        console.log('Squirrel cancelling');
    }


    /**
     * Status hook for the Squirrel
     * @returns {Promise<string>}
     *
     * #TODO: Add status logic ;)
     */
    async status() {
        console.log('Squirrel status');
        return 'unknown'
    }


    /**
     * Save hook for the Squirrel
     * @returns {Promise<void>}
     */
    async save() {
        console.log('Squirrel saving');
    }


    /**
     * Fetch a URL and return the response data
     * @param url
     * @param tries
     * @returns {Promise<*|null>}
     *
     * #TODO: Add retry logic and env var for max retries
     */
    async fetch(url, tries= 0) {
        console.log( `fetching ${url}` )
        if (this.config?.delayRange) {
            await delayRandom(
            this.config.delayRange.min,
            this.config.delayRange.max,
            );
        } else {
            await delay(5000);
        }

        const res = await this._xhttp.get(url.href)
            .catch(err=>console.log(`Error fetching ${url.href}: ${err}`))

        if (res)
            return res.data;

        if (tries > 2 || tries < 0 )
            return null
        console.log( 'retrying' )
        return this.fetch(url, ++tries);
    }
}

export default Squirrel;
