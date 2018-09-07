import request from '../utils/request';
import * as api from '../utils/api';
import {toQueryString} from '../utils/utils';

export async function getMapOrgCount(params) {
  return request(`${api.getMapOrgCount}`);
}

export async function getMapTagCount(params) {
  return request(`${api.getMapTagCount}`);
}
export async function getMapOrgPerceiveAndFace(params) {
  return request(`${api.getMapOrgPerceiveAndFace}`);
}
export async function getAllNation(params) {
  return request(`${api.getAllNation}`);
}
export async function getAllTag(params) {
  return request(`${api.getAllTag}`);
}
export async function getAllPartisan(params) {
  return request(`${api.getAllPartisan}`);
}
export async function getMapSearch(params) {
  return request(`${api.getMapSearch}?${toQueryString(params)}`);
}
export async function getAllVillage(params) {
  return request(`${api.getAllVillage}`);
}
export async function getPersonTagChartByOrgId(params) {
  return request(`${api.getPersonTagChartByOrgId}?${toQueryString(params)}`);
}
export async function getPersonChartByOrgId(params) {
  return request(`${api.getPersonChartByOrgId}?${toQueryString(params)}`);
}

export async function getPersonDetailById(params) {
  return request(`${api.getPersonDetailById}?${toQueryString(params)}`);
}

export async function getPersonFacePerveiceById(params) {
  return request(`${api.getPersonFacePerveiceById}?${toQueryString(params)}`);
}
export async function getPersonAccessControlById(params) {
  return request(`${api.getPersonAccessControlById}?${toQueryString(params)}`);
}
export async function getCarInfoByPersonId(params) {
  return request(`${api.getCarInfoByPersonId}?${toQueryString(params)}`);
}
export async function getHouseInfoByPersonId(params) {
  return request(`${api.getHouseInfoByPersonId}?${toQueryString(params)}`);
}