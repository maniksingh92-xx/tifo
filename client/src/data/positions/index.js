import { fetchApi } from '../../services/api/index';

const endPoints = {
  get: '/positions'
};

export const get = payload => fetchApi(endPoints.get, payload, 'get');