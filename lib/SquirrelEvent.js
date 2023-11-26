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

SquirrelEvent.prototype.squirrel = function () {
    return createFromEvent(this)
}

SquirrelEvent.prototype.run = async function () {
    console.log('Squirrel Run')
    const squirrel = this.squirrel()
    try {
        await squirrel.run()
    } catch (e) {
        console.log('Squirrel Run Error', e)
        this.remove()
    }
    this.remove()
}

SquirrelEvent.prototype.save = async function () {
    console.log(`Squirrel Save ${this.type}`)
    squirrels.push(this)
    return this
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

    console.log('Squirrel Remove')
    console.log('count', this.all().length)
    delete this
}

