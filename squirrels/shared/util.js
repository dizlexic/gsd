export const randomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const delay = async (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
};
export const delayRandom = async (min, max) => {
    return await delay(randomInRange(min, max));
};
