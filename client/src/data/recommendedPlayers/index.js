import { fetchApi } from '../../services/api/index';

const endPoints = {
  get: '/recommended-players'
};

export const get = payload => fetchApi(endPoints.get,
                                       payload,
                                       'get',
                                       {
                                         headers: {
                                           "Content-Type": "text/plain"
                                         }
                                       });