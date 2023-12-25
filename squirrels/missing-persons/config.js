import { config as base } from '../../config.js';

process.env.MISSING_PERSONS_URL = "https://www.mshp.dps.missouri.gov/CJ51/Search?page=1&county=&personType=A";

const missingTemplate = (adult = true) => {
    return `https://www.mshp.dps.missouri.gov/CJ51/Search?page=1&county=&personType=${
    adult ? "A" : "J"
    }`;
};
export const config = {
    ...base,
    targets: [missingTemplate(true), missingTemplate(false)],
    template: missingTemplate,
    delayRange: { min: 10000, max: 15000 },

    api: {
        url: process.env.MISSING_PERSONS_ENDPOINT_URL ?? "http://localhost",
        port: process.env?.MISSING_PERSONS_PORT ?? 80,
        hook: process.env?.MISSING_WEBHOOK ?? "api/webhooks/missing",
    },
};

export default config;
