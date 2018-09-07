
import request from '../utils/request';
import * as api from '../utils/api';
import { toQueryString } from '../utils/utils';


export async function getCarAmount(params) {
    return request(`${api.getCarAmount}`);
}
export async function getParkingAmount(params) {
    return request(`${api.getParkingAmount}`);
}
export async function getTodayCarPerceive(params) {
    return request(`${api.getTodayCarPerceive}`);
}
export async function getRealTimeCarPerceive(params) {
    return request(`${api.getRealTimeCarPerceive}`);
}
export async function getAllVillage(params) {
    return request(`${api.getAllVillageCar}`);
}
export async function getCarInfoCounts(params) {
    return request(`${api.getCarInfoCounts}?${toQueryString(params)}`);
}
export async function getProvince(params) {
    return request(`${api.getProvince}?${toQueryString(params)}`);
}
export async function getCarModel(params) {
    return request(`${api.getCarModel}?${toQueryString(params)}`);
}
export async function getColor(params) {
    return request(`${api.getColor}?${toQueryString(params)}`);
}
export async function getPlateType(params) {
    return request(`${api.getPlateType}?${toQueryString(params)}`);
}
export async function getCarBrand(params) {
    return request(`${api.getCarBrand}?${toQueryString(params)}`);
}
export async function getCar(params) {
    return request(`${api.getCar}?${toQueryString(params)}`);
}
export async function getCarInfo(params) {
    return request(`${api.getCarInfo}?${toQueryString(params)}`);
}