import xhttp from '../shared/xhttp.js';


export class GSDispatcher {
    token = null;
    event = null;
    xhttp = xhttp();

    async updateStatus(event, status) {
        event.status = status;

        if (event?.token) {
            this.xhttp.defaults.headers['Authorization'] = `Bearer ${event?.token}`;
        }

        const { data } = await this.xhttp
            .post("api/gsd/status-update", event)
            .catch((err) => {
                return null;
            });

        return data;
    }

    async dispatch(event) {
        const { token, type } = event;
        const { Squirrel } = await import(`../squirrels/${type}/index.js`);
        const squirrel = new Squirrel( token, event );
        await squirrel.run();
    }
}

export const instance = new GSDispatcher()
