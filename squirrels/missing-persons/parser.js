import * as cheerio from 'cheerio';
import { Parser as base } from '../../lib/Parser.js';


export class Parser extends base {

    constructor() {
        super()
    }

    async parse(data, list = true) {
        if (list) return await this.list(data);
        return await this.detail(data);
    }

    createRecord($, element, names) {
        let record = {};

        for (const index in names) {
            let name = names[index];
            name = name.trim();
            name = name.toLowerCase().replace(/\s/g, "_");
            record[name] = null;

            if (name === "photo" || name === "poster") {

                const src = "photo" === name
                    ? $(element[index]).find("img")?.attr("src")
                    : $(element[index]).find("a")?.attr("href");

                try {
                    const url = new URL(src, 'https://www.mshp.dps.missouri.gov/');
                    if (src === undefined) {
                        record[name] = null;
                        continue;
                    }

                    if (url.pathname.split('/').includes('CJ51')) {
                        record[name] = null;
                        continue
                    }

                    if (url.pathname !== "/") {
                        record[name] = url.href
                        continue;
                    }
                }
                catch (e) {
                    console.log(e)
                    continue;
                }
            }

            const text = $(element[index])?.text()?.trim() ?? null;
            record[name] = text.length ? text : null;
        }

        console.log(JSON.stringify(record, null, 2))
        return this.formatRow(record);
    }


    /**
     * Remove whitespace from a string
     * @param str
     * @returns {string}
     */
    sanitize(str) {
        return str.replace(/[\t\n\r\f\v]/g, "").trim();
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

    async list(data){
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
            //- console.log(JSON.stringify(record, null, 2))
        }
        return out;
    }

    async detail(data) {
        throw new Error("Not implemented");
    }
}

export default Parser;
