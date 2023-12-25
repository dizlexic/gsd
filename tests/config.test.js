import { expect, test } from '@jest/globals';
import { config } from '../config.js';

const requiredConfigKeys = [
    {name: 'headers', type: 'object'},
    {name: 'redis', type: 'object'},
    {name: 'port', type: 'number'},
    {name: 'env', type: 'object'},
];

test('config', () => {
    expect(typeof config).toBe('object');

    for (const key of requiredConfigKeys) {
        expect(config).toHaveProperty(key.name);
        expect(typeof config[key.name]).toBe(key.type);
    }
});
