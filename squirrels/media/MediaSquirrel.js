import Squirrel from '../shared/Squirrel.js';
import { delayRandom } from 'squirrels/shared/util.js';


export default class MediaSquirrel extends Squirrel {
    async run() {
        console.log('Media Squirrel from index.js running')
        const task = {...this._task}

        const { missing } = task?.data || { missing: [] };

        if (missing.length === 0) {
            console.log('Media Squirrel: no missing files')
            return this.updateStatus(task, 'finished');
        }

        const length = missing.length;
        console.log('Media Squirrel: missing files', length)

        while(missing.length > 0) {
            const missing_person = missing.pop();
            console.log('Media Squirrel: missing file', file)
            await delayRandom(...this.config.delayRange)

            const file = {
                person: missing_person,
                type: 'photo',
                url: missing_person?.photo,
            }


            await this.download(file);
        }
    }

    async download(file)
    {
        console.log('Media Squirrel: downloading file', file)

        const url = new URL(file)

        try {
            const res = await this.xhttp.get(file);
        } catch (err) {
            console.log('Media Squirrel: error downloading file', file, err)
            missing.push(file);
            return this.updateStatus(task, 'error');
        }
    }

    async streamFile(file) {

    }

    async save(tries = 0) {
        const task = {...this._task};
        console.log('Saving Media Squirrel task', task);
    }
}
