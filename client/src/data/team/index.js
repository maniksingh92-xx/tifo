import { fetchApi } from '../../services/api/index';

const endPoints = {
  get: '/team',
  put: '/team',
  delete: '/team'
};

export const get = payload => fetchApi(endPoints.put, payload, 'get');
export const update = payload => fetchApi(endPoints.put, payload, 'put');
export const del = payload => fetchApi(endPoints.put, payload, 'delete');