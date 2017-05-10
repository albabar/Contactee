import authenticityToken from './authenticityToken';
import 'whatwg-fetch';

export function post(url, body, options = {}) {
  return fetch(url,
    {
      ...options,
      credentials: 'same-origin',
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'X-CSRF-Token': authenticityToken, 'Content-Type': 'application/json' }
    }
  );
}

export default post;
