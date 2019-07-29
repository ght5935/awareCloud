import request from '../utils/request';
import * as api from '../utils/api';
import { toQueryString } from '../utils/utils';

export async function getAllVillage(params) {
    return request(`${api.getAllVillage}`);
}

export async function getPhoneDeviceList(params) {
    return request(`${api.getPhoneDeviceList}`);
}
export async function getPorbeList(params) {
    return request(`${api.getPorbeList}?${toQueryString(params)}`);
}
export async function getPerceiveTopTotal(params) {
    return request(`${api.getPerceiveTopTotal}?${toQueryString(params)}`);
}
export async function getPerceiveLineChart(params) {
    return request(`${api.getPerceiveLineChart}?${toQueryString(params)}`);
}
