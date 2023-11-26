import createFromEvent from '../squirrels/export.js'

export let squirrels = [];

export class SquirrelEvent {
    constructor(event){
        this.type = event?.type ?? 'generic';
        this.name = event?.name;
        this.action = event?.action;
        this.data = event?.data ?? {};
        this.timestamp = Date.now();
        this.event = event;
    }
}
export default function squirrelEvent(event, fromJson = true) {
    const data = fromJson ? JSON.parse(event) : event
    return new SquirrelEvent(data)
}

SquirrelEvent.prototype.toString = function () {
    return JSON.stringify(this)
}

SquirrelEvent.prototype.run = async function () {
    console.log('Squirrel Run', this)
    const squirrel = createFromEvent(this)
    await squirrel.run()
    this.remove()
}

SquirrelEvent.prototype.save = async function () {
    console.log('Squirrel Save', this)
    squirrels.push(this)
}

SquirrelEvent.prototype.all = function () {
    return squirrels
}

SquirrelEvent.prototype.remove = function () {
    console.log('length', this.all().length)
    const index = squirrels.indexOf(this)
    if (index > -1) {
        squirrels.splice(index, 1)
    }
    console.log('Squirrel Remove', this)
    console.log('count', this.all().length)
}
