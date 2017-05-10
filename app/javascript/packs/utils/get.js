import 'whatwg-fetch';
import parseJSON from './_parseJSON';
import checkStatus from './_checkStatus';

export function get(url, options = {}) {
  return fetch(url, {...options, credentials: 'same-origin'}).then(checkStatus).then(parseJSON);
}

export default get;
