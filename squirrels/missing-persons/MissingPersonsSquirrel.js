import { Squirrel } from '../Squirrel.js'

export class MissingPersonsSquirrel extends Squirrel {
    constructor (token) {
        super(token)
        this.name = 'MissingPersonsSquirrel'
    }

    async run () {
        console.log('MissingPersonsSquirrel running')
    }
}

export default MissingPersonsSquirrel;
