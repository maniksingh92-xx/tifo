import { fetchApi } from '../../services/api/index';

const endPoints = {
  get: '/team',
  put: '/team',
};

export const get = payload => fetchApi(endPoints.put, payload, 'get');
export const update = payload => fetchApi(endPoints.put, payload, 'put');