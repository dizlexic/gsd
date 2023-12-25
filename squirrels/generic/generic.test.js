import { expect, test } from '@jest/globals';
import { Squirrel } from './index.js';
import { config } from './config.js';

test('Squirrel exists', () => {
    const genericSquirrel = new Squirrel({});
    expect(typeof Squirrel).toBe('function');
    expect(typeof genericSquirrel).toBe('object');
    expect(genericSquirrel.config).toBe(config);
});
