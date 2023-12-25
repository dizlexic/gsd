import { expect, test } from '@jest/globals';
import { Squirrel } from './index.js';
import { config } from './config.js';

test('MissingPersonsSquirrel exists', () => {
    const mediaSquirrel = new Squirrel({});
    expect(typeof mediaSquirrel).toBe('object');
});

test('MissingPersonsSquirrel has config', () => {
    const mediaSquirrel = new Squirrel({});
    expect(mediaSquirrel.config).toBe(config);
});
