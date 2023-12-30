import { delayRandom } from '../../shared/util.js';
import Squirrel from '../../lib/Squirrel.js';
import { config } from './config.js';
import FormData from 'form-data';
import * as https from 'https';

/**
 * Media Squirrel
 * @class
 * @extends Squirrel
 * @description Handles downloading media files from source and sending them to API
 **/
// Downloads media files from source and sends to API
export default class MediaSquirrel extends Squirrel {
    async run() {
        console.log('Media Squirrel from index.js running')
        const task = {...this._task}

        const { media } = await this.getTargets(task);

        if (!media?.length) {
            console.log('Media Squirrel: no media to transfer')
            return this.updateStatus(task, 'done');
        }

        for (const file of media) {
            await delayRandom(config.delayRange.min, config.delayRange.max);
            console.log('Media Squirrel: transferring file', file?.id);
            await this.handle(file);
        }
    }

    async getTargets() {
        const url = new URL(`${config.apiServer}${config.targetEndpoint}`);
        url.searchParams.append('limit', config.limit);
        console.log('Media Squirrel: getting targets', url)
        const res = await this._xhttp.get(url.href, {
            timeout: config.timeout
        });
        console.log(`Media Squirrel: received ${res?.data?.media?.length ?? 0} targets`)
        return res?.data
    }

    // Download file and send to API
    // Sends file as multipart/form-data
    // Sends task as JSON
    // Returns response from API
    // TODO: handle errors
    async handle(file)
    {
        return new Promise((resolve, reject) => {
            // set task data
            const task = {...this._task};
            task.data = { file };
            task.file = file;

            delete task?.dispatcher;
            delete task?._manager;

            const form = new FormData();
            // Initiate download
            https.get(task.file?.source, response => {

                // Configure form and append data
                form.setBoundary('----SquirrelFormBoundary7MA4YWxkTrZu0gW')
                form.append('task', JSON.stringify(task))
                form.append('file', response); // file stream

                const headers = {
                    'Authorization': 'Bearer ' + task?.token,
                    ...form.getHeaders(),
                }

                // Send file to API
                form.submit(
                {
                    host: 'localhost',
                    path: '/api/media/update/' + task.file?.id,
                    auth: task?.token,
                    headers,
                }, (error, response) => {
                    if (error) reject(error);
                    let body = '';
                    if (!response) return reject('No response from server?');
                    response.on('data', chunk => {
                        body += chunk.toString()
                    });
                    response.on('error', error => {
                        reject(error)
                    });
                    response.on('end', () => {
                        console.log(body);
                        resolve(JSON.parse(body))
                    });
                    response.resume();
                });
            });
        });
    }

    async save(tries = 0) {
        const task = {...this._task};
        console.log(`Media Squirrel: NOOP save ${task?.id} completed`);
    }
}
