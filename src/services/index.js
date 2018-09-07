import request from '../utils/request';
import * as api from '../utils/api';
import {toQueryString} from '../utils/utils';

export async function five_real(params) {
  return request(`${api.five_real}`);
}

export async function getFacilities(params) {
  return request(`${api.getFacilities}`);
}
export async function getSecurity(params) {
  return request(`${api.getSecurity}`);
}
export async function getTodayFace(params) {
  return request(`${api.getTodayFace}`);
}
export async function getOrgWeek(params) {
  return request(`${api.getOrgWeek}`);
}


// 房屋
export async function getAllVillage(params) {
  return request(`${api.getAllVillage}`);
}
export async function getHouseAmountByVillage(params) {
  return request(`${api.getHouseAmountByVillage}`);
}
export async function getHouseTypeAmount(params) {
  return request(`${api.getHouseTypeAmount}`);
}

export async function getListByOrgunitId(params) {
  return request(`${api.getListByOrgunitId}?${toQueryString(params)}`);
}
export async function getBuildingList(params) {
  return request(`${api.getBuildingList}?${toQueryString(params)}`);
}
export async function getUnitList(params) {
  return request(`${api.getUnitList}?${toQueryString(params)}`);
}
export async function getFloorList(params) {
  return request(`${api.getFloorList}?${toQueryString(params)}`);
}
export async function getRoomList(params) {
  return request(`${api.getRoomList}?${toQueryString(params)}`);
}
export async function getHouseType(params) {
  return request(`${api.getHouseType}?${toQueryString(params)}`);
}
export async function getHouseAttribute(params) {
  return request(`${api.getHouseAttribute}?${toQueryString(params)}`);
}
export async function getHouse(params) {
  return request(`${api.getHouse}?${toQueryString(params)}`);
}
export async function getHouseInfoByOrgunitId(params) {
  return request(`${api.getHouseInfoByOrgunitId}?${toQueryString(params)}`);
}
export async function getVillageChart(params) {
  return request(`${api.getVillageChart}?${toQueryString(params)}`);
}
export async function getHouseInfo(params) {
  return request(`${api.getHouseInfo}?${toQueryString(params)}`);
}
export async function getUtilitiesDate(params) {
  return request(`${api.getUtilitiesDate}?${toQueryString(params)}`);
}
export async function getUtilities(params) {
  return request(`${api.getUtilities}?${toQueryString(params)}`);
}