
export class GSDispatcher {

    event = null

    constructor(event) {
        if (typeof event !== 'object') throw new Error('GSDispatcher requires an event object')
        this.event = event
    }

    async updateStatus(status) {
        const { token } = this.event
        const { data } = await this.axios.post('api/webhook/status', {
            id: this.event?.id,
            event: this.event,
            status,
        })
        return data
    }

    async dispatch() {
        const { token, name } = this.event
        const Squirrel = await import(`../squirrels/${name}/index.js`)
        const squirrel = new Squirrel.default(token, this)
        await squirrel.run()
    }


}
