import request from '../utils/request';
import * as api from '../utils/api';
import { toQueryString } from '../utils/utils';

export async function getAllVillage(params) {
    return request(`${api.getAllVillage}`);
}
export async function getProvince(params) {
    return request(`${api.getProvince}?${toQueryString(params)}`);
}
export async function listPoiPre(params) {
    return request(api.listPoiPre, {
      method: 'post',
      data: params
    });
  }
  