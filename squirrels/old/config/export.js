import process from "node:process";
import dotenv from "dotenv";

import db from "./db.js";
import headers from "./headers.js";
import targets from "./targets.js";
import xhttp from "./xhttp.js";

const { parsed } = await dotenv.config();

export const squrriel_conf = {
    opts: parsed,
    args: process.argv.slice(2),
    env: process.env.NODE_ENV,
    targets,
    db,
    headers,
    xhttp,
};

export default squrriel_conf;
