import FormData from 'form-data';
import http from 'http';
import https from 'https';

/**
 * Generate a "random" number between min and max
 * @param min
 * @param max
 * @returns {number}
 */
export function randomInRange (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Delay for a given amount of time in ms (e.g. 1000 = 1 second)
 * @param ms
 * @returns {Promise<void>}
 */
export async function delay (ms) {
    console.log(`Delaying for ${ms}ms`);
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Delay for a random amount of time between min and max
 * @param min
 * @param max
 * @returns {Promise<void>}
 */
export function delayRandom (min, max) {
    return delay(randomInRange(min, max));
};


/**
 * Stream a file from a URL to an API endpoint
 * @param target - URL of the file to download
 * @param endpoint - API endpoint to send the file to
 * @param data - Object of data to send to the API alongside the file (e.g. { name: 'My File' })
 * @param token - optional API bearer token
 * @returns {Promise<any>}
 */
export const streamToApi = async (target, endpoint, data = {}, token = null) => {
    const form = new FormData();
    const target_url = new URL(target);
    const endpoint_url = new URL(endpoint);

    form.setBoundary(`----SquirrelFormBoundary${randomInRange(1000000000000000, 9999999999999999)}`)
    for (const [key, value] of Object.entries(data)) {
        form.append(key, JSON.stringify(value));
    }

    const headers = {
        'Connection': 'keep-alive',
        'Transfer-Encoding': 'chunked',
        'Content-type': `multipart/form-data; boundary=${form.getBoundary()}`,
        'User-Agent': 'Squirrel/1.0.0',
    }

    if(token) headers['Authorization'] = `Bearer ${token}`

    return new Promise((resolve, reject) => {
        // Initiate download
        https.get(target_url.href, file_response => {
            form.append('file', file_response); // file stream

            // Send file to API
            form.submit(
            {
                host: endpoint_url.host,
                path: endpoint_url.pathname,
                method: 'POST',
                headers,
            }, (err, res) => {
                if (err) reject(err);
                let out = '';
                if (!res) return reject('No response from server?');
                res.on('data', chunk => {
                    out += chunk.toString()
                });
                res.on('error', err => {
                   console.log(err)
                   console.log(form.getHeaders())
                });
                res.on('end', () => {
                    resolve(JSON.parse(out))
                });
                res.resume();
            });
        });
    });
}

/**
 * Clear the temp folder
 * @type {function(): Promise<void>}
 * @async
 * @throws {Error}
 * @returns {Promise<void>}
 */
export const clearTempFolder = async () => {
    const fs = require('fs');
    const path = require('path');
    const tempDir = path.join(__dirname, '../temp');

    fs.readdir(tempDir, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            if (file === '.gitignore') continue;
            fs.unlink(path.join(tempDir, file), err => {
                if (err) throw err;
            });
        }
    });
};

/**
 * Send a heartbeat to the API
 * @param to
 * @param data
 * @param token
 * @returns {Promise<boolean>}
 */
export async function sendHeartBeat (to, data, token = null) {
    const target = new URL(to);
    const reqModule = target.protocol === 'https:' ? https : http;

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'User-Agent': 'Squirrel/1.0.0',
        },
    };

    if (token) options.headers['Authorization'] = `Bearer ${token}`;

    return new Promise((resolve) => {
        try {
            reqModule.request(target, options, (res, err) => {
                if (err) return resolve(false);
                res.on('close', () => resolve(true));
            })
        } catch (e) {
            resolve(false);
        }
    });

};
