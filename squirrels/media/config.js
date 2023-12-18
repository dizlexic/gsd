export const config = {
    delayRange: {
        min: process.env?.DELAYRANGE_MIN || 10000,
        max: process.env?.DELAYRANGE_MIN || 20000,
    },
};

export default config;
