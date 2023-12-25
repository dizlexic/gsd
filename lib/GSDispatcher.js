import xhttp from '../shared/xhttp.js';


/**
 * GSDispatcher class
 * @type {GSDispatcher}
 *
 * @property {string} token - API bearer token
 * @property {string} event - Event name
 * @property {xhttp} xhttp - xhttp instance
 */
export class GSDispatcher {
    token = null;
    event = null;
    xhttp = xhttp();


    /**
     * Send a status update to the API
     * @param event
     * @param status
     * @returns {Promise<*|null>}
     *
     * @Warning: This method probably should be replaced with a more generic method
     * @Warning: This method uses a hardcoded API endpoint /api/gsd/status-update
     */
    async updateStatus(event, status) {
        event.status = status;

        if (event?.token) {
            this.xhttp.defaults.headers['Authorization'] = `Bearer ${event?.token}`;
        }

        const res = await this.xhttp
            .post("api/gsd/status-update", event)
            .catch((err) => {
                return null;
            });

        if (!res || res?.data?.status === 'error') {
            console.log('Error updating status', res?.data?.message);
            return null;
        }
        return res?.data;
    }
}


/**
 * GSDispatcher instance
 * @type {GSDispatcher}
 */
export const instance = new GSDispatcher()
