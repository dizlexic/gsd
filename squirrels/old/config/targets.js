const missingTemplate = (adult = true) => {
    return `https://www.mshp.dps.missouri.gov/CJ51/Search?page=1&county=&personType=${
        adult ? "A" : "J"
    }`;
};
export default {
    missing: {
        targets: [missingTemplate(true), missingTemplate(false)],
        template: missingTemplate,
    },
};
