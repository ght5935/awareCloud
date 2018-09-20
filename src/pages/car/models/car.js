import { isApiSuccess, apiData, delay } from "../../../utils/utils";
import { WEBSOCKET_URL } from '../../../utils/config';
import {
    getCarAmount,
    getParkingAmount,
    getTodayCarPerceive,
    getRealTimeCarPerceive,
    getAllVillage,
    getCarInfoCounts,

    getProvince,
    getCarModel,
    getCarBrand,
    getColor,
    getPlateType,
    getCar,

    getCarInfo

} from "../../../services/car";

export default {
    namespace: 'car',
    state: {
        searchVisible: false,
        iSLoop: true,
        carList: [],
        pinkingList: [],
        mapOrgPerceiveAndFace: '',
        todayFace: [],
        AllVillageList: [],
        carChart: {
            chartList: [],
            villageId: '33'
        },
        provinceList: [],
        typeList: [],
        brandList: [],
        colorsList: [],
        plateList: [],
        carInfoList: [],
        carSearch: {
            carSearchParams: {
                province: '',
                plate_number: '',
                model: '',
                brand: '',
                color: '',
                name: '',
                phone: '',
                orgunitId: '',
                plate_type: ''
            }
        },
        carInfo: {
            carId: '',
            carInfoData: ''
        }
    },
    subscriptions: {},
    effects: {
        * getCarAmount({ payload }, { put, call, select }) {
            const response = yield call(getCarAmount, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        carList: result
                    }
                });
            }
        },
        * getParkingAmount({ payload }, { put, call, select }) {
            const response = yield call(getParkingAmount, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        pinkingList: result
                    }
                })
            }
        },
        * getTodayCarPerceive({ payload }, { put, call, select }) {
            const response = yield call(getTodayCarPerceive, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        mapOrgPerceiveAndFace: result
                    }
                })
            }
        },
        * getRealTimeCarPerceive({ payload }, { put, call, select }) {
            const iSLoop = yield select(store => store.car.iSLoop)
            const response = yield call(getRealTimeCarPerceive, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        todayFace: result
                    }
                })
                if (iSLoop) {
                    yield call(delay, 3000)
                    yield put({ type: 'getRealTimeCarPerceive' })
                }
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
        * getCarInfoCounts({ payload }, { put, call, select }) {
            const carChart = yield select(store => store.car.carChart);
            const response = yield call(getCarInfoCounts, { orgunitId: carChart.villageId - 0 });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        carChart: {
                            ...carChart,
                            chartList: result
                        }
                    }
                });
            }
        },

        // 搜索 search
        * getProvince({ payload }, { put, call, select }) {
            const response = yield call(getProvince, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        provinceList: result
                    }
                });
            }
        },
        * getCarModel({ payload }, { put, call, select }) {
            const response = yield call(getCarModel, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        typeList: result.map(v => ({ id: v.model, modelStr: v.modelStr }))
                    }
                });
            }
        },
        * getColor({ payload }, { put, call, select }) {
            const response = yield call(getColor, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        colorsList: result
                    }
                });
            }
        },
        * getCarBrand({ payload }, { put, call, select }) {
            const response = yield call(getCarBrand, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        brandList: result
                    }
                });
            }
        },
        * getPlateType({ payload }, { put, call, select }) {
            const response = yield call(getPlateType, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                // result.unshift({ "plateType": 0, "plateTypeStr": "不限" })
                yield put({
                    type: 'success',
                    payload: {
                        plateList: result.map(v => ({ id: v.plateType, plateTypeStr: v.plateTypeStr }))
                    }
                });
            }
        },
        * getCar({ payload }, { put, call, select }) {
            const carSearch = yield select(store => store.car.carSearch);
            let carSearchParams = carSearch.carSearchParams;
            const params = {
                province: carSearchParams.province,
                plate_number: carSearchParams.plate_number,
                model: carSearchParams.model,
                brand: carSearchParams.brand,
                color: carSearchParams.color,
                name: carSearchParams.name,
                phone: carSearchParams.phone,
                orgunitId: carSearchParams.orgunitId,
                plate_type: carSearchParams.plate_type,
            }
            const response = yield call(getCar, { ...params });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        carInfoList: result
                    }
                });
            }
        },
        // info 一车一档
        * getCarInfo({ payload }, { put, call, select }) {
            const carInfo = yield select(store => store.car.carInfo);
            const response = yield call(getCarInfo, { carId: carInfo.carId });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        carInfo: {
                            ...carInfo,
                            carInfoData: result
                        }
                    }
                })
            }
        },
    },
    reducers: {
        success(state, action) {
            return { ...state, ...action.payload };
        }
    }
}