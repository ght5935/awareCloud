import request from '../utils/request';
import * as api from '../utils/api';
import { toQueryString } from '../utils/utils';

export async function getAllVillage(params) {
    return request(`${api.getAllVillage}`);
}
export async function getProvince(params) {
    return request(`${api.getProvince}?${toQueryString(params)}`);
}
export async function getCameras(params) {
    return request(api.getCameras, {
      method: 'post',
      data: params
    });
  }
  export async function getListCar(params) {
    return request(api.getListCar, {
      method: 'post',
      data: params
    });
  }