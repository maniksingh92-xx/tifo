import apiConfig from './config';
import fetchival from 'fetchival';

export const fetchApi = (endPoint, payload = {}, method = 'get', headers = {}) => {
  return fetchival(`${apiConfig.url}${endPoint}`)[method.toLowerCase()](payload)
  .catch((e) => {throw e});
}