import xhttp from '../shared/xhttp.js'

export class Squirrel
{
    token = null;
    axios = null;
    name = 'Squirrel';
    constructor(token) {
        this.token = token;
        this.axios = xhttp(token);
    }

    async run() {
        console.log('Squirrel running');
    }
}

export default Squirrel;
