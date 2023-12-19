import { Squirrel } from '../shared/Squirrel.js';
import { delay } from '../shared/util.js';
import { config } from './config.js';
import { Parser } from './parser.js';


export class MissingPersonsSquirrel extends Squirrel
{
    config = config
    targets = config.targets

    async run() {
        let out = [];

        for (const target of this.targets) {
            const url = new URL(target)
            const data = await this.fetch(url)
            const parsed = await new Parser().parse(data)
            out = out.concat(parsed);
        }

        this._task.data = { missing: out }
    }

    async save(tries= 0) {
        if (tries > 0) return;
        // hackey af and maybe not even needed
        const instance = await import('../../shared/xhttp.js')
        const xhttp = instance.default(this.token);
        const url = new URL(`${process.env.APP_URL}:${process.env.APP_PORT}/${process.env.MISSING_WEBHOOK}`);

        const task = {...this._task}
        delete task._manager
        delete task.dispatcher
        delete task._updates

        // fuck it why not both fp ~ TODO
        task.user_uuid = task.user_id
        const missing = task.data?.missing ?? []

        for (let i = 0; i < missing.length; ++i) {
            let person = missing[i]
            // do things
            missing[i] = person
        }

        task.data.missing = missing

        // for (const person in missing) {
        //     const pic_url = person?.photo
        //     const poster_url = person?.poster
        //     const filename = person?.filename
        //     const tmp = await TMP_DIR()
        //
        //     if (pic_url) {
        //         const file_ext = pic_url.split('.').pop()
        //         const file = await getFile(
        //             pic_url,
        //             `${tmp}/${filename}_photo.${file_ext}`
        //         ).then(()=>{
        //
        //         })
        //     }
        //
        //
        //     await delayRandom(config.delayRange.min, config.delayRange.max)
        // }

        const res = await xhttp.post(url.href, task, {})
            .catch(err=>console.log('error posting', err, Object.keys(task)))

        if (res?.statusCode < 200 || res?.statusCode > 299) {
            await delay(this.config.delayRange.min)
            console.log('Failed with code', res?.statusCode)
            console.log('and message', res?.statusMessage)
            return await this.save(tries++)
        }

        console.log('Save complete')
    }
}

export default MissingPersonsSquirrel;

