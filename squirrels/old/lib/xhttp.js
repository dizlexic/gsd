import axios from "axios";

const xhttp = (conf) =>
    axios.create({
        ...conf,
    });

const build = (conf) => {
    return xhttp(conf);
};

export default xhttp;

