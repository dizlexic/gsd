export const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const delay = async (ms) => {
    console.log(`Delaying for ${ms}ms`);
    return new Promise((resolve) => setTimeout(resolve, ms));
};
export const delayRandom = async (min, max) => {
    return await delay(randomInRange(min, max));
};

export async function getFile(fileUrl, outputLocationPath) {
    const { createWriteStream } = await import('fs');
    const { default: Axios } = await import('axios');
    const writer = createWriteStream(outputLocationPath);

    return Axios({
        method: 'get',
        url: fileUrl,
        responseType: 'stream',
    })
    .then(response => {
        //ensure that the user can call `then()` only when the file has
        //been downloaded entirely.

        return new Promise((resolve, reject) => {
            response.data.pipe(writer);
            let error = null;
            writer.on('error', err => {
                error = err;
                writer.close();
                reject(err);
            });
            writer.on('close', () => {
                if (!error) {
                    resolve(true);
                }
                //no need to call the reject here, as it will have been called in the
                //'error' stream;
            });
        });
    });
}

export const TMP_DIR = async () => {
    // Create tmp dir if it doesn't exist
    const { default: fs } = await import('fs');
    const { default: path } = await import('path');
    const { default: os } = await import('os');
    const tmpDir = path.join(os.tmpdir(), 'squirrels');
    if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir);
    }

    return tmpDir;
}
