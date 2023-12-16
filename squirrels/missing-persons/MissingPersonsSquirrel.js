import { Squirrel } from '../shared/Squirrel.js';
import { delay, delayRandom } from '../shared/util.js';
import { parser } from './parser.js';
import xhttp from 'shared/xhttp.js';


export class MissingPersonsSquirrel extends Squirrel
{
    xhttp = xhttp();

    async run() {
        const data = await this.getData()
        this.list = parser(data)
    }

    async getData(tries= 0) {
        const { body } = this.xhttp.get(process.env.MISSING_PERSONS_URL)
            .catch(err=>logger.error(err))
        if (body)
            return body
        if (tries > 2)
            return null
        await delayRandom(this.conf.xhttp.delayRange)
        return await this.getData(tries++)
    }

    async save(tries=0) {
        if (tries > 0) return;

        xhttp.baseURL = `${process.env.APP_URL}:${process.env.APP_PORT}/`

        const url = `${process.env.MISSING_WEBHOOK}`

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

