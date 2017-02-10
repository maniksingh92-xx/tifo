import { fetchApi } from '../../services/api/index';

const endPoints = {
  get: '/players'
};

export const get = payload => fetchApi(endPoints.get, payload, 'get');