import * as client from 'socket.io-client';
import { config } from '../config.js';


export class GSDNotifi
{
    client = null;
    token = null;
    event = null;


    constructor(dispatchedEvent = {})
    {
        this.token = dispatchedEvent?.token;
        this.event = dispatchedEvent?.event;
        this.client = GSDNotifi.connect(this.token);

        this.client.on('error', GSDNotifi.errorHandler);
    }


    static async connect(token)
    {
        return client.connect(`${config.socket_url}:${config.socket_port}`, {
            path: '/api/socket.io', transports: ['websocket'], auth: {
                token: token
            }
        });
    }


    static async errorHandler(error)
    {
        console.error(error);
    }


    async leave()
    {
        return this.client.emit('leave', {event: this.event});
    }


    async join()
    {
        return this.client.emit('join', {event: this.event});
    }


    async updateStatus(status)
    {
        return this.emit('status-update', {status: status});
    }


    async updateProgress(progress)
    {
        return this.emit('progress-update', {progress: progress});
    }


    async updateError(error)
    {
        return this.emit('error-update', {error: error});
    }


    async sendComplete()
    {
        return this.emit('complete', {});
    }


    async emit(event, data = {})
    {
        data.event = this.event;
        this.client.emit(event, data);
    }
}


export default GSDNotifi;
