import commonHeaders from './_commonHeaders';
import 'whatwg-fetch';
import checkStatus from './_checkStatus';

export function deleTE(url, options = {}) {
  return fetch(url,
    {
      ...options,
      credentials: 'same-origin',
      method: 'DELETE',
      headers: commonHeaders(options.headers),
    }
  ).then(checkStatus);
}

export default deleTE;
