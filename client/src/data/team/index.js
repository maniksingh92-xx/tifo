import { fetchApi } from '../../services/api/index';

const endPoints = {
  put: '/team',
};

export const update = payload => {

  return fetchApi(endPoints.put, payload, 'put');
}