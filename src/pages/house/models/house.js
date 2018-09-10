import { isApiSuccess, apiData } from "../../../utils/utils";
import { WEBSOCKET_URL } from '../../../utils/config';
import {
    getHouseAmountByVillage,
    getHouseTypeAmount,
    getListByOrgunitId,
    getBuildingList,
    getUnitList,
    getFloorList,
    getRoomList,
    getHouseType,
    getHouseAttribute,
    getHouse,
    getHouseInfoByOrgunitId,
    getAllVillage,
    getVillageChart,
    getHouseInfo,
    getUtilitiesDate,
    getUtilities
} from "../../../services/index";

export default {
    namespace: 'house',
    state: {
        AllVillageList: [],
        houseTotal: {
            houseNumber: [],
            houseType: []
        },
        houseHome: {
            urbanList: [],
            villageList: [],
            buildList: [],
            UnitList: [],
            FloorList: [],
            RoomList: [],
            HouseTypeList: [],
            AttributeList: [],
            HouseList: [],
            houseHomeParams: {
                burg: '',
                villageName: '',
                orgunitId: '',
                village: '',
                building: '',
                unit: '',
                floor: '',
                room: '',
                type_id: '',
                attribute_id: ''
            },
            villageOrgunitId: '',
            villageOrgunitIdList: []
        },
        houseChart: {
            VillageChartList: [],
            villageId: '33'
        },
        houseInfo: {
            personDetail: false,
            personDetailId: '',
            houseInfoData: {},
            utilityData: {},
            houseId: '',
            UtilitiesDateList: [],
            utilityDate: ''
        }
    },
    subscriptions: {},
    effects: {
        * getHouseAmountByVillage({ payload }, { put, call, select }) {
            const houseTotal = yield select(store => store.house.houseTotal);
            const response = yield call(getHouseAmountByVillage, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        houseTotal: {
                            ...houseTotal,
                            houseNumber: result
                        }
                    }
                });
                yield put({ type: 'getHouseTypeAmount' })
            }
        },
        * getHouseTypeAmount({ payload }, { put, call, select }) {
            const houseTotal = yield select(store => store.house.houseTotal);
            const response = yield call(getHouseTypeAmount, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        houseTotal: {
                            ...houseTotal,
                            houseType: result
                        }
                    }
                })
            }
        },
        * getListByOrgunitId({ payload }, { put, call, select }) {
            const houseHome = yield select(store => store.house.houseHome);
            let houseHomeParams = houseHome.houseHomeParams;
            const response = yield call(getListByOrgunitId, { orgunitId: houseHomeParams.burg ? houseHomeParams.burg : '' });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        houseHome: {
                            ...houseHome,
                            urbanList: result,
                            villageList: [],
                            buildList: [],
                            UnitList: [],
                            FloorList: [],
                            RoomList: [],
                        }
                    }
                })
            }
        },
        * getListByOrgunitId2({ payload }, { put, call, select }) {
            const houseHome = yield select(store => store.house.houseHome);
            let houseHomeParams = houseHome.houseHomeParams;
            const response = yield call(getListByOrgunitId, { orgunitId: houseHomeParams.orgunitId ? houseHomeParams.orgunitId : '' });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        houseHome: {
                            ...houseHome,
                            villageList: result,
                            buildList: [],
                            UnitList: [],
                            FloorList: [],
                            RoomList: [],
                        }
                    }
                })
            }
        },

        * getBuildingList({ payload }, { put, call, select }) {
            const houseHome = yield select(store => store.house.houseHome);
            let houseHomeParams = houseHome.houseHomeParams;
            const params = {
                orgunitId: houseHomeParams.village ? houseHomeParams.village : ''
            }
            const response = yield call(getBuildingList, { ...params });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        houseHome: {
                            ...houseHome,
                            buildList: result,
                            UnitList: [],
                            FloorList: [],
                            RoomList: [],
                        }
                    }
                })
            }
        },
        * getUnitList({ payload }, { put, call, select }) {
            const houseHome = yield select(store => store.house.houseHome);
            let houseHomeParams = houseHome.houseHomeParams;
            const params = {
                // orgunitId: houseHomeParams.village ? houseHomeParams.village : '',
                building: houseHomeParams.building
            }
            const response = yield call(getUnitList, { ...params });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        houseHome: {
                            ...houseHome,
                            UnitList: result,
                            FloorList: [],
                            RoomList: [],
                        }
                    }
                })
            }
        },
        * getFloorList({ payload }, { put, call, select }) {
            const houseHome = yield select(store => store.house.houseHome);
            let houseHomeParams = houseHome.houseHomeParams;
            const params = {
                // orgunitId: houseHomeParams.village ? houseHomeParams.village : '',
                // building: houseHomeParams.building,
                unit: houseHomeParams.unit
            }
            const response = yield call(getFloorList, { ...params });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        houseHome: {
                            ...houseHome,
                            FloorList: result,
                            RoomList: [],
                        }
                    }
                })
            }
        },
        * getRoomList({ payload }, { put, call, select }) {
            const houseHome = yield select(store => store.house.houseHome);
            let houseHomeParams = houseHome.houseHomeParams;
            const params = {
                // orgunitId: houseHomeParams.village ? houseHomeParams.village : '',
                // building: houseHomeParams.building,
                // unit: houseHomeParams.unit,
                floor: houseHomeParams.floor,
            }
            const response = yield call(getRoomList, { ...params });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        houseHome: {
                            ...houseHome,
                            RoomList: result
                        }
                    }
                })
            }
        },
        * getHouseType({ payload }, { put, call, select }) {
            const houseHome = yield select(store => store.house.houseHome);
            const response = yield call(getHouseType, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        houseHome: {
                            ...houseHome,
                            HouseTypeList: result
                        }
                    }
                })
                yield put({ type: 'getHouseAttribute' })
            }
        },
        * getHouseAttribute({ payload }, { put, call, select }) {
            const houseHome = yield select(store => store.house.houseHome);
            const response = yield call(getHouseAttribute, {});
            if (isApiSuccess(response)) {
                let result = apiData(response);
                result.unshift({ id: 0, attributeName: '不限', htmlColor: "#9A4444 ", useAble: 1 })
                yield put({
                    type: 'success',
                    payload: {
                        houseHome: {
                            ...houseHome,
                            AttributeList: result
                        }
                    }
                })
            }
        },
        * getHouse({ payload }, { put, call, select }) {
            const houseHome = yield select(store => store.house.houseHome);
            let houseHomeParams = houseHome.houseHomeParams;
            const params = {
                villageName: houseHomeParams.villageName,
                orgunitId: houseHomeParams.village ? houseHomeParams.village : '',
                building: houseHomeParams.building,
                unit: houseHomeParams.unit,
                floor: houseHomeParams.floor,
                room: houseHomeParams.room,
                type_id: houseHomeParams.type_id ? houseHomeParams.type_id : '',
                attribute_id: houseHomeParams.attribute_id ? houseHomeParams.attribute_id : '',
            }
            const response = yield call(getHouse, { ...params });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        houseHome: {
                            ...houseHome,
                            HouseList: result
                        }
                    }
                })
            }
        },
        * getHouseInfoByOrgunitId({ payload }, { put, call, select }) {
            const houseHome = yield select(store => store.house.houseHome);
            const params = {
                orgunitId: houseHome.villageOrgunitId ? houseHome.villageOrgunitId : '',
            }
            const response = yield call(getHouseInfoByOrgunitId, { ...params });
            if (isApiSuccess(response)) {
                let result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        houseHome: {
                            ...houseHome,
                            villageOrgunitIdList: result
                        }
                    }
                })
            }
        },
        // 图表chart
        * getAllVillage({ payload }, { put, call, select }) {
            const response = yield call(getAllVillage, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        AllVillageList: result
                    }
                });
            }
        },
        * getVillageChart({ payload }, { put, call, select }) {
            const houseChart = yield select(store => store.house.houseChart);
            const response = yield call(getVillageChart, { orgunitId: houseChart.villageId });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        houseChart: {
                            ...houseChart,
                            VillageChartList: result
                        }
                    }
                });
            }
        },
        * getHouseInfo({ payload }, { put, call, select }) {
            const houseInfo = yield select(store => store.house.houseInfo);
            const response = yield call(getHouseInfo, { houseId: houseInfo.houseId });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        houseInfo: {
                            ...houseInfo,
                            houseInfoData: result
                        }
                    }
                });
                yield put({ type: 'getUtilitiesDate' })
            }
        },
        * getUtilitiesDate({ payload }, { put, call, select }) {
            const houseInfo = yield select(store => store.house.houseInfo);
            const response = yield call(getUtilitiesDate, { houseId: houseInfo.houseId });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        houseInfo: {
                            ...houseInfo,
                            UtilitiesDateList: result,
                            utilityDate: result && result.length > 0 ? result[0].month : ''
                        }
                    }
                });
                yield put({ type: 'getUtilities' })
            }
        },
        * getUtilities({ payload }, { put, call, select }) {
            const houseInfo = yield select(store => store.house.houseInfo);
            const params = {
                houseId: houseInfo.houseId,
                date: houseInfo.utilityDate
            }
            const response = yield call(getUtilities, { ...params });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        houseInfo: {
                            ...houseInfo,
                            utilityData: result
                        }
                    }
                });
            }
        }

    },
    reducers: {
        success(state, action) {
            return { ...state, ...action.payload };
        }
    }
}