import { expect, test } from '@jest/globals';
import { config } from '../config.js';

const requiredEnvKeys = [
    'JWT_SECRET',
    'REDIS_HOST',
    'REDIS_PORT',
    'WEBHOOK_URL',
    'REDIS_IN_CHANNEL',
    'REDIS_OUT_CHANNEL',
];

test('config', () => {
    for (const key of requiredEnvKeys) {
        expect(config.env).toHaveProperty(key);
        expect(config.env[key]).not.toBeFalsy();
    }
});
