import authenticityToken from './authenticityToken';
import 'whatwg-fetch';
import parseJSON from './_parseJSON';
import checkStatus from './_checkStatus';


export function post(url, body, options = {}) {
  return fetch(url,
    {
      ...options,
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'X-CSRF-Token': authenticityToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  ).then(checkStatus).then(parseJSON);
}

export default post;
