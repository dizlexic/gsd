import xhttp from "../shared/xhttp.js";

export class GSDispatcher {
    token = null;
    event = null;
    axios = null;
    id = null;

    constructor(event) {
        if (typeof event !== "object") throw new Error("GSDispatcher requires an event object");
        this.event = event;
        this.axios = xhttp(event?.token);

        this.token = event?.token;
        this.id = event?.id;
    }

    async updateStatus(status) {
        const { token } = this.event;
        if (!token) return false;
        this.axios.headers["Authorization"] = `Bearer ${token}`;
        const { data } = await this.axios
            .post("api/gsd/status-update", {
                id: this.id,
                event: this.event,
                token: this.token,
                status: status,
            })
            .catch((err) => {
                console.log("GSDispatcher updateStatus err", err);
                return { data: { status: "error" } };
            });

        return data;
    }

    async dispatch() {
        const { token, type } = this.event;
        const { Squirrel } = await import(`../squirrels/${type}/index.js`);
        const squirrel = new Squirrel(token, this);
        await squirrel.run();
    }
}
