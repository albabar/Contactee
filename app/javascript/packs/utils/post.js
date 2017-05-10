import commonHeaders from './_commonHeaders';
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
      headers: commonHeaders(options.headers)
    }
  ).then(checkStatus).then(parseJSON);
}

export default post;
