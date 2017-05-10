import authenticityToken from './authenticityToken';
import 'whatwg-fetch';
import parseJSON from './_parseJSON';
import checkStatus from './_checkStatus';

export function patch(url, body, options = {}) {
  return fetch(url,
    {
      ...options,
      credentials: 'same-origin',
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: {
        'X-CSRF-Token': authenticityToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  ).then(checkStatus).then(parseJSON);
}

export default patch;
