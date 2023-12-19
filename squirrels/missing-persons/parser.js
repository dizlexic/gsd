import * as cheerio from 'cheerio';
import { Parser as base } from '../shared/parser.js';


export class Parser extends base {
    constructor() {
        super()
    }
    async parse(data, list = true) {
        if (list) return await this.list(data);
        return this.detail(data);
    }

    //            h>Rec#</th>\n' +
    // '        <th>Photo</th>\n' +
    // '        <th>Name</th>\n' +
    // '        <th>&nbsp;&nbsp;&nbsp;Gender&nbsp;&nbsp;&nbsp;</th>\n' +
    // '        <th>&nbsp;&nbsp;&nbsp;Race&nbsp;&nbsp;&nbsp;</th>\n' +
    // '        <th>Missing Since</th>\n' +
    // '        <th>Date of Birth</th>\n' +
    // '        <th>Investigating Agency</th>\n' +
    // '         <th>Missing From</th>\n' +
    // '        <th>Type</th>\n' +
    // '        <th>Poster</th>\n' +
    createRecord($, element, names) {
        let record = {};

        for (const index in names) {
            let name = names[index];
            name = name.trim();
            name = name.toLowerCase().replace(/\s/g, "_");

            if (name === "photo" || name === "poster") {
                record[name] = $(element[index]).find("img").attr("src");
                continue;
            }

            record[name] = $(element[index]).text();
        }



        return this.formatRow(record);
    }

    formatRow(row) {
        for (const key in row) {
            if (row[key] === undefined) {
                row[key] = null;
            }

            if (typeof row[key] === "string") {
                row[key] = row[key].replace(/[\t\n\r\f\v]/g, "");
                row[key] = row[key].trim();

                if (row[key] === "") {
                    row[key] = null;
                }
            }


        }

        return row;
    }

    async list(data) {
        let out = [];
        const $ = cheerio.load(data);

        const headers = $("div#missingPersonsAll table#example thead tr th");
        const headerNames = [];
        for (const header of headers) {
            headerNames.push($(header).text());
        }

        const rows = $("div#missingPersonsAll table#example tbody tr");
        for (const row of rows) {
            const cols = $(row).find("td");
            if (cols.length < 2) continue;
            const record = this.createRecord($, cols, headerNames);
            out.push(record);
            console.log(JSON.stringify(record, null, 2))
        }
        return out;
    }

    async detail(data) {
        throw new Error("Not implemented");
    }
}

export default Parser;
