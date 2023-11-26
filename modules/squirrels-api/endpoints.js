var endpoint = function ( method, path ) {
  return {
    method: method,
    path: path,
  }
}

export const endpoints = {
    media: {
        unsaved: endpoint('get', '/media/unsaved'),
    },

    missing: {
        save: endpoint('post', '/webhooks/missing'),
    },
}
export default endpoints;
