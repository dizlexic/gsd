import xhttp from '../../shared/xhttp.js'
import Squirrel from '../shared/Squirrel.js'
import got from 'got';

export default class MediaSquirrel extends Squirrel {
    constructor(token) {
        super(token)
        this.name = 'MediaSquirrel'
    }

    async run() {
        console.log('Media Squirrel from index.js running')
        let list = []

        try {
            list = await this.getList()
        } catch (e) {
            console.log('no media to save')
            return
        }

        const media = await this.save(list)
    }


    async save(list) {
        for (const media of list) {
            console.log('Media Squirrel save', media)
            const { body } = await got.post('http://localhost:3000/api/media', {
                json: media,
                responseType: 'json',
            })
            console.log('Media Squirrel save response', body)

        }
    }


    async get(media) {
        const target = media?.url
        if (!target) {
            throw new Error('No media url')
        }
        const req = await request(target)
        const res = await axios.get('https://stream.example.com', {
            responseType: 'stream'
        });

        res.data.pipe();

    }
    async getList() {
        const { media } = this.axios.get('api/media/unsaved/20')
        const list = media || []

        console.log('Media Squirrel list', list.length)

        if(!list.length) {
            throw new Error('No media to save')
        }

        return list
    }
}
