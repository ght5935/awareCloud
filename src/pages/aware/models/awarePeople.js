import { isApiSuccess, apiData, delay } from "../../../utils/utils";
import * as Api from '../../../services/awarePeople';

export default {
    namespace: 'awarePeople',
    state: {
        AllVillageList: [],
        awareChart: {
            villageId: ''
        },
        detailVisible: false,
        trackVisible: false,
        searchParams: {
            pageNo: 1,
            pageSize: 9,
            orgunitId: '',
            cameraId: '',
            startTime: '',
            endTime: '',
            startScore: '',
            endScore: '',
            name: '',
            identityCard: '',
            tag: ''
        },
        peopleList: [],
        peoplePage: {
            pageSize: 9,
            currentPage: 1,
            total: 0
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
        * listPoiPre({ payload }, { put, call, select }) {
            const params = yield select(store => store.awarePeople.searchParams);
            const response = yield call(Api.listPoiPre, params);

            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        peopleList: result.list,
                        peoplePage: result.page
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