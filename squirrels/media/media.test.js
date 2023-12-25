import { expect, test } from '@jest/globals';
import { Squirrel } from './index.js';
import { config } from './config.js';

test('MediaSquirrel exists', () => {
    const mediaSquirrel = new Squirrel({}, config);
    expect(typeof mediaSquirrel).toBe('object');
});

test('MediaSquirrel has config', () => {
    const mediaSquirrel = new Squirrel({}, config);
    expect(mediaSquirrel.config).toBe(config);
});
