import { isApiSuccess, apiData, delay } from "../../../utils/utils";
import * as Api from '../../../services/aware';

export default {
    namespace: 'aware',
    state: {
        AllVillageList: [],
        awareChart:{
            villageId: ''
        },
        perceiveTotal: {
            probeHistoryDayTotal: '',
            probeHistoryTotal: '',
            carHistoryDayTotal: '',
            carHistoryTotal: '',
            openDoorDayTotal: '',
            openDoorTotal: '',
            eventHistoryDayTotal: '',
            eventHistoryTotal: '',
        },
        chartsParams: {
            startTime: '',
            endTime: '',
            searchType: ''
        },
        chartsLine: {
            day: '',
            total: ''
        }
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
        * getPerceiveTopTotal({payload}, {put, call, select}){
            const params = yield select(store => store.aware.awareChart)
            const response = yield call(Api.getPerceiveTopTotal, {orgunitId: params.villageId});
            if(isApiSuccess(response)){
                const result = apiData(response);
                console.log(result)
                yield put({
                    type: 'success',
                    payload: {
                        perceiveTotal: result
                    }
                })
            }
        },
        * getPerceiveLineChart({payload}, {put, call, select}){
            const orgunitId = yield select(store => store.aware.awareChart.villageId)
            const params = yield select(store => store.aware.chartsParams)
            const response = yield call(Api.getPerceiveLineChart, {...params, orgunitId});
            if(isApiSuccess(response)){
                const result = apiData(response);
                console.log(result)
                yield put({
                    type: 'success',
                    payload: {
                        chartsLine: result
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