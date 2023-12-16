import { Squirrel } from '../shared/Squirrel.js';
import { delay, delayRandom } from '../shared/util.js';
import { parser } from './parser.js';
import xhttp from 'shared/xhttp.js';


export class MissingPersonsSquirrel extends Squirrel {
    constructor (token) {
        super(token)
        this.name = 'MissingPersonsSquirrel'
    }

    async run() {
        const data = await this.getData()
        this.list = parser(data)
    }

    async getData(tries= 0) {
        const { body } = axios.get(this.conf.opts.MISSING_URL)
            .catch(err=>logger.error(err))
        if (body) return body
        if (tries > 2) return null
        await delayRandom(this.conf.xhttp.delayRange)
        return await this.getData(tries++)
    }

    async save(tries=0) {
        // TODO - this is a mess
        // first at least update tries count after test
        if (tries > 0) {
            // Throw and log some shit
            logger.error('Save Error')
            return; //:(
        }
        xhttp.baseURL = `${this.conf.opts.APP_URL}:${this.conf.opts.APP_PORT}/`

        const url = `${this.conf.opts.MISSING_WEBHOOK}`

        const data = this.list

        if (data.length === 0) return;

        const res = await this.axios.post(url, data)
            .catch(err=>logger.error(err))

        if (res?.status !== 200) {
            await delay(this.conf.xhttp.delayRange.min)
            await this.save(tries++)
        }

        console.log(res)
    }
}

export default MissingPersonsSquirrel;

