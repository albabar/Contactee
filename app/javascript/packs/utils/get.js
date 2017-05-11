import 'whatwg-fetch';
import parseJSON from './_parseJSON';

export function get(url, options = {}) {
  return fetch(url, {...options, credentials: 'same-origin'}).then(parseJSON);
}

export default get;
