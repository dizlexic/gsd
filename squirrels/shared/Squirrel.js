import xhttp from '../../shared/xhttp.js'

export class Squirrel
{
    token = null;
    axios = null;
    name = 'Squirrel';
    dispatcher = null;

    constructor(token, dispatcher = null) {
        this.token = token;
        this.axios = xhttp(token);
        this.dispatcher = dispatcher;
    }

    async run() {
        console.log('Squirrel running');
    }
}

export default Squirrel;
