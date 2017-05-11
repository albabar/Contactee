import commonHeaders from './_commonHeaders';
import 'whatwg-fetch';
import parseJSON from './_parseJSON';


export function post(url, body, options = {}) {
  return fetch(url,
    {
      ...options,
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(body),
      headers: commonHeaders(options.headers)
    }
  ).then(parseJSON);
}

export default post;
