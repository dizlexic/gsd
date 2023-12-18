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

    createRecord($, element) {
        let record = {};
        try {
            record.number = $(element[0])?.text();
            record.photo = $(element[1])?.find("img").attr("src");
            record.name = $(element[2])?.text();
            record.gender = $(element[3])?.text();
            record.race = $(element[4])?.text();
            record.missing_since = $(element[5])?.text();
            record.dob = $(element[6])?.text();
            record.investigative_agency = $(element[7])?.text();
            record.missing_from = $(element[8])?.text();
            record.classification = $(element[9])?.text();
            record.poster = $(element[10]).find("a")?.attr("href");
        } catch (e) {
            return (record.error = e);
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
            }
        }

        return row;
    }

    async list(data) {
        let out = [];
        const $ = cheerio.load(data);
        const rows = $("div#missingPersonsAll table#example tbody tr");
        for (const row of rows) {
            const cols = $(row).find("td");
            if (cols.length < 2) continue;
            const record = this.createRecord($, cols);
            console.log(record);
            out.push(record);
        }
        return out;
    }

    async detail(data) {
        throw new Error("Not implemented");
    }
}

export default Parser;
