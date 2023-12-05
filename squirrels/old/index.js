import { squrriel_conf } from "./config/export.js";

import Squirrel from "./lib/squirrel.js";

const squirrel = new Squirrel(squrriel_conf);

squirrel.run();

export default squirrel;
