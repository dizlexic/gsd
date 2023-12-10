import logger from "../../shared/logger.js";
import xhttp from "./xhttp.js";
import parsers from "../parsers/export.js";
import { delay, delayRandom } from './util.js';
class Squirrel {
    logger = logger;
    conf;
    xhttp;
    targets;
    list = [];
    constructor(conf) {
        this.conf = conf;
        this.type = conf.args.length > 0 ? conf.args[0] : "missing";
        this.targets = this.conf.targets[this.type].targets;
        this.parser = new parsers[this.type]();
        this.xhttp = xhttp(conf.xhttp);
    }
    async run() {
        for (const target of this.targets) {
            const { data } = await this.xhttp.get(target);
            const parsed = await this.parser.parse(data);
            this.list = this.list.concat(parsed);
            await delayRandom(
                this.conf.xhttp.delayRange.min,
                this.conf.xhttp.delayRange.max,
            );
        }
        await this.save();
    }

    async save(tries=0) {
        if(tries > 0){//5) {
            // Throw and log some shit
            logger.error('Save Error')
            return; //:(
        }
        xhttp.baseURL = `${this.conf.opts.APP_URL}:${this.conf.opts.APP_PORT}/`
        const url = `${this.conf.opts.MISSING_WEBHOOK}`
        const data = this.list
        if (data.length === 0) return;
        const res = await this.xhttp.post(url, data)
        .catch(err=>logger.error(err))
        if (res?.status !== 200) {
            await delay(this.conf.xhttp.delayRange.min)
            await this.save(tries++)
        }

        console.log(res)
    }
}
export default Squirrel;
