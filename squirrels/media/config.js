import { config as base } from '../../config.js';

export const config = {

    ...base, // Spread the base config

    delayRange: {
        min: process.env?.DELAYRANGE_MIN || 10000,
        max: process.env?.DELAYRANGE_MIN || 20000,
    },

    apiServer: process.env.MEDIA_API_SERVER || 'http://localhost',
    targetEndpoint: process.env.MEDIA_ENDPOINT || '/api/media/unsaved',
    limit: process.env.MEDIA_LIMIT || 10,
    timeout: process.env.MEDIA_TIMEOUT || 10000,
    uploadEndpoint: process.env.MEDIA_UPLOAD_ENDPOINT || '/api/media/update',
};

export default config;
