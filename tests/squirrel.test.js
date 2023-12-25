import { expect, test } from '@jest/globals';
import { Squirrel } from '../lib/Squirrel.js';
import { config } from '../config.js';

test('Is it a squirrel?', () => {
    const squirrel = new Squirrel({});

    /**
     * Methods
     */
    expect(squirrel).toHaveProperty('run');
    expect(squirrel).toHaveProperty('save');
    expect(squirrel).toHaveProperty('fetch');
    expect(squirrel).toHaveProperty('cancel');
    expect(squirrel).toHaveProperty('status');

    /**
     * Getters
     */
    expect(squirrel).toHaveProperty('event');
    expect(squirrel.event).toBe('unknown');

    expect(squirrel).toHaveProperty('dispatcher');
    expect(squirrel.dispatcher).toBe(null);

    expect(squirrel).toHaveProperty('token');
    expect(squirrel.token).toBe(null);

    expect(squirrel).toHaveProperty('config');
    expect(squirrel.config).toBe(config);
});
