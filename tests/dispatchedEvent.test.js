import { expect, test } from '@jest/globals';
import { DispatchedEvent } from '../lib/DispatchedEvent.js';

const testEvent = {
    event: 'test', data: {
        test: 'test',
    }
};

const dataAsStringEvent = {
    event: 'test', data: 'foo'
};

const dataAsStringJson = JSON.stringify(dataAsStringEvent);
const testEventStringJson = JSON.stringify(testEvent);

test('DispatchedEvent exists', () => {
    const dispatchedEvent = new DispatchedEvent({});
    expect(typeof dispatchedEvent).toBe('object');
});

test('DispatchedEvent from obj', () => {
    const dispatchedEvent = new DispatchedEvent(testEvent);
    expect(dispatchedEvent.data).toStrictEqual(testEvent.data);
});

test('DispatchedEvent from json', () => {
    const dispatchedEvent = new DispatchedEvent(testEventStringJson);
    expect(dispatchedEvent.data).toStrictEqual(testEvent.data);
});

test('DispatchedEvent from rude data', () => {
    const dispatchedEvent = new DispatchedEvent(dataAsStringEvent);
    expect(dispatchedEvent.data).toBe(dataAsStringEvent.data);
});

test('DispatchedEvent from json with rude data', () => {
    const dispatchedEvent = new DispatchedEvent(dataAsStringJson);
    expect(dispatchedEvent.data).toBe(dataAsStringEvent.data);
});
