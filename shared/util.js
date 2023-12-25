import FormData from 'form-data';
import https from 'https';

/**
 * Generate a "random" number between min and max
 * @param min
 * @param max
 * @returns {number}
 */
export const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Delay for a given amount of time in ms (e.g. 1000 = 1 second)
 * @param ms
 * @returns {Promise<void>}
 */
export const delay = async (ms) => {
    console.log(`Delaying for ${ms}ms`);
    return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Delay for a random amount of time between min and max
 * @param min
 * @param max
 * @returns {Promise<void>}
 */
export const delayRandom = async (min, max) => {
    return await delay(randomInRange(min, max));
};


/**
 * Stream a file from a URL to an API endpoint
 * @param target - URL of the file to download
 * @param endpoint - API endpoint to send the file to
 * @param data - Object of data to send to the API alongside the file (e.g. { name: 'My File' })
 * @param token - optional API bearer token
 * @returns {Promise<any>}
 */
export async const streamToApi= (target, endpoint, data= {}, token= null) => {
    const form = new FormData();
    const target_url = new URL(target);
    const endpoint_url = new URL(endpoint);

    form.setBoundary(`----SquirrelFormBoundary${randomInRange(1000000000000000, 9999999999999999)}`)
    for (const [key, value] of Object.entries(data)) {
        form.append(key, JSON.stringify(value));
    }

    const headers = {
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked',
        'Accept': 'application/json',
        'Content-type': `multipart/form-data; boundary=${form.getBoundary()}`,
        'User-Agent': 'Squirrel/1.0.0',
    }

    if(token) headers['Authorization'] = `Bearer ${token}`

    return new Promise((resolve, reject) => {
        // Initiate download
        https.get(target_url.href, res => {
            form.append('file', res); // file stream

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
                res.on('end', () => {
                    resolve(JSON.parse(out))
                });
                res.resume();
            });
        });
    });
}

