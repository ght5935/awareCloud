import { isApiSuccess, apiData, delay } from "../../../utils/utils";
import * as Api from '../../../services/awareCar';

export default {
    namespace: 'awareCar',
    state: {
        AllVillageList: [],
        awareChart: {
            villageId: ''
        },
        detailVisible: false,
        trackVisible: false,
        searchParams: {
            pageSize: 12,
            pageNo: 1,
            orgunitId: '',
            cameraId: '',
            startTime: '',
            endTime: '',
            province: '',
            plateNumber: '',
            model: '',
            name: '',
            phone: '',
            plateType: ''
        },
        provinceList: [],
        camerasList: [],
        carList: [],
        carPage: {
            pageSize: 10,
            currentPage: 1,
            total: 0
        },
        modelData:''
    },
    subscriptions: {},
    effects: {

        // 感知首页
        * getAllVillage({ payload }, { put, call, select }) {
            const response = yield call(Api.getAllVillage, {});
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

        * getProvince({ payload }, { put, call, select }) {
            const response = yield call(Api.getProvince, {});
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
        * getCameras({ payload }, { put, call, select }) {
            const searchParams = yield select(store => store.awareCar.searchParams)
            const response = yield call(Api.getCameras, { orgunitId: searchParams.orgunitId });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        camerasList: result
                    }
                });
            }
        },

        * getListCar({ payload }, { put, call, select }) {
            const params = yield select(store => store.awareCar.searchParams);
            const response = yield call(Api.getListCar, params);
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        carList: result.list,
                        carPage: result.page
                    }
                })
            }
        }
    },
    reducers: {
        success(state, action) {
            return { ...state, ...action.payload };
        }
    }
}