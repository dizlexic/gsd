process.env.MISSING_PERSONS_URL = "https://www.mshp.dps.missouri.gov/CJ51/Search?page=1&county=&personType=A";

const missingTemplate = (adult = true) => {
    return `https://www.mshp.dps.missouri.gov/CJ51/Search?page=1&county=&personType=${
    adult ? "A" : "J"
    }`;
};
export const config = {
    targets: [missingTemplate(true), missingTemplate(false)],
    template: missingTemplate,
    delayRange: { min: 10000, max: 15000 },
};

export default config;
