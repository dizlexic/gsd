import { expect, test } from '@jest/globals';
import { Squirrel } from './index.js';
import { Parser } from './parser.js';
import { config } from './config.js';

test('MissingPersonsSquirrel exists', () => {
    const mediaSquirrel = new Squirrel({});
    expect(typeof mediaSquirrel).toBe('object');
});

test('MissingPersonsSquirrel has config', () => {
    const mediaSquirrel = new Squirrel({});
    expect(mediaSquirrel.config).toBe(config);
});


/**
 * PARSER TESTS
 */

/**
 * test html data for parsing
 * the actual html is not like exactly this
 * but close enough to know the parser works
 * @type {string}
 */
const parserTestData = `
<div id="missingPersonsAll">
<table id="example" class="display" style="width:100%">
    <thead>
        <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Missing From</th>
            <th>Missing Date</th>
            <th>Date of Birth</th>
            <th>Missing City</th>
            <th>Missing State</th>
            <th>Poster</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><img src="https://www.missingkids.org/photographs/NCMC1392445c1.jpg" alt="Photo of Aaliyah Ramirez">photo</td>
            <td>Aaliyah Ramirez</td>
            <td>San Antonio</td>
            <td>Jan 1, 2021</td>
            <td>Jan 1, 2006</td>
            <td>San Antonio</td>
            <td>Texas</td>
            <td><a href="/CJ51/images/female.jpg" target="_blank">poster</a></td>
        </tr>
</div>`;

test('MissingPersonsSquirrel parser exists', () => {
    const parser = new Parser();
    expect(typeof parser).toBe('object');
});

test('MissingPersonsSquirrel parser has parse method', () => {
    const parser = new Parser();
    expect(typeof parser.parse).toBe('function');
});

test('MissingPersonsSquirrel parser parses data', async () => {
    const parser = new Parser();
    const data = await parser.parse(parserTestData);
    expect(data.length).toBe(1);
});

test('MissingPersonsSquirrel parser parses data to object', async () => {
    const parser = new Parser();
    const data = await parser.parse(parserTestData);
    expect(typeof data[0]).toBe('object');
});

test('MissingPersonsSquirrel parser parses data to object with correct keys', async () => {
    const parser = new Parser();
    const data = await parser.parse(parserTestData);
    expect(Object.keys(data[0])).toEqual([
        'photo',
        'name',
        'missing_from',
        'missing_date',
        'date_of_birth',
        'missing_city',
        'missing_state',
        'poster',
    ]);
});

test('MissingPersonsSquirrel parser parses data to object with correct values', async () => {
    const parser = new Parser();
    const data = await parser.parse(parserTestData);
    expect(data[0]).toEqual({
        photo: 'https://www.missingkids.org/photographs/NCMC1392445c1.jpg',
        name: 'Aaliyah Ramirez',
        missing_from: 'San Antonio',
        missing_date: 'Jan 1, 2021',
        date_of_birth: 'Jan 1, 2006',
        missing_city: 'San Antonio',
        missing_state: 'Texas',
        poster: 'https://www.missingkids.org/poster/NCMC/1392445/1/screen',
    });
});


