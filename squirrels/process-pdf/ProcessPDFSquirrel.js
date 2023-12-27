import Squirrel from '../../lib/Squirrel.js';
import fs from 'fs/promises';
import pdf2json from 'pdf2json';
import { fileURLToPath } from 'url';
import * as path from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class ProcessPDFSquirrel extends Squirrel
{
    async run()
    {
        console.warn('Process Pdf Squirrel is a WIP');
        const pdf = await fs.readFile(path.join(__dirname, 'test-pdfs/1.pdf'));
        const parser = new pdf2json();
        parser.on('pdfParser_dataError', errData => console.error(errData.parserError));
        parser.on('pdfParser_dataReady', pdfData => {
            console.log(pdfData);
            console.log(pdfData.Pages)
            const allText = pdfData.Pages.map(
                page => page.Texts.map(
                    text => text?.R.map(r => decodeURIComponent(r.T)).join('')
                ).join('')
            );
            console.log(JSON.stringify(allText, null, 2));
        });
        parser.parseBuffer(pdf);
    }
}


export default ProcessPDFSquirrel;
