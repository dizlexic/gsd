export default {
    name: 'media',
    'get:list': 'api/media',
    'get:one': 'api/media/:id',
    'post:many': 'api/webhook/media',
}
