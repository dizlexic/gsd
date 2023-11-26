
export class SquirrelsApi {

  constructor() {
    this._api = new Api();
  }

  get() {
    return this._api.get('/squirrels');
  }

  post(squirrel) {
    return this._api.post('/squirrels', squirrel);
  }
}

export default function () {
  return new SquirrelsApi();
}

export { endpoints } from './endpoints.js';
