import authenticityToken from './_authenticityToken';

export function commonHeaders(extraHeaders = {}) {
  return Object.assign({
    'X-CSRF-Token': authenticityToken,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }, extraHeaders)
}

export default commonHeaders;
