import 'whatwg-fetch';

export function get(url, options = {}) {
  return fetch(url, {...options, credentials: 'same-origin'});
}

export default get;
