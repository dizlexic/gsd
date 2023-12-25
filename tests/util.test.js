import { expect, test } from '@jest/globals';
import { randomInRange } from '../shared/util.js';

test('randomInRange', () => {
    expect(randomInRange(1, 10)).toBeGreaterThanOrEqual(1);
});
