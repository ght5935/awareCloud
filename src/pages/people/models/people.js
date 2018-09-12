import { getTodayFace } from "../../../services/index";
import {
    getMapOrgCount,
    getMapTagCount,
    getMapOrgPerceiveAndFace,
    getAllNation,
    getAllTag,
    getAllPartisan,
    getMapSearch,
    getAllVillage,
    getPersonTagChartByOrgId,
    getPersonChartByOrgId,
    getPersonDetailById,
    getPersonFacePerveiceById,
    getPersonAccessControlById,
    getCarInfoByPersonId,
    getHouseInfoByPersonId
} from "../../../services/people";
import { getUtilitiesDate, getUtilities } from '../../../services/index'

import { isApiSuccess, apiData } from "../../../utils/utils";

export default {
    namespace: 'people',
    state: {
        searchVisible: false,
        todayFace: [],
        mapOrgCount: [],
        mapTagCount: [],
        mapOrgPerceiveAndFace: [],
        totalSearchParams: {
            name: '',
            idCard: '',
            gender: '',
            nation: '',
            tag: '',
            partisanId: '',
            phone: '',
            nation: '',
            carCount: '',
            partisanId: '',
            marital_status: '',
            census: '',
            orgunitId: ''
        },
        allPartisan: [],
        allNation: [],
        allTag: [],
        searchResult: [],
        allVillage: [],
        getChartsParam: {
            orgunitId: ''
        },
        houseInfo: [],
        carInfo: [],
        personAccess: [],
        personDetail: [],
        personFace: [],
        personId: '',
        UtilitiesDateList: [],
        utilitiesParams: '',
        utilityData: {},
        chartTotal: {
            genderTotal: '',
            censusTotal: '',
            ageTotal: ''
        }
    },
    effects: {
        * getTodayFace({ payload }, { put, call, select }) {
            const response = yield call(getTodayFace, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        todayFace: result
                    }
                })
            }
        },
        * getMapOrgCount({ payload }, { put, call, select }) {
            const response = yield call(getMapOrgCount, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        mapOrgCount: result
                    }
                })
            }
        },
        * getMapTagCount({ payload }, { put, call, select }) {
            const response = yield call(getMapTagCount, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        mapTagCount: result
                    }
                })
            }
        },
        * getMapOrgPerceiveAndFace({ payload }, { put, call, select }) {
            const response = yield call(getMapOrgPerceiveAndFace, {});
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

        * getAllNation({ payload }, { put, call, select }) {
            const response = yield call(getAllNation, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        allNation: result
                    }
                })
            }
        },
        * getAllTag({ payload }, { put, call, select }) {
            const response = yield call(getAllTag, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        allTag: result
                    }
                })
            }
        },
        * getAllPartisan({ payload }, { put, call, select }) {
            const response = yield call(getAllPartisan, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        allPartisan: result
                    }
                })
            }
        },
        * getMapSearch({ payload }, { put, call, select }) {
            const params = yield select(store => store.people.totalSearchParams);
            const response = yield call(getMapSearch, params);
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        searchResult: result
                    }
                })
            }
        },
        * getAllVillage({ payload }, { put, call, select }) {
            const response = yield call(getAllVillage, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        allVillage: result
                    }
                })
            }
        },
        * getPersonTagChartByOrgId({ payload }, { put, call, select }) {
            let params = ''
            if (payload) {
                params = payload;
            } else {
                params = yield select(store => store.people.getChartsParam.orgunitId);
            }
            const response = yield call(getPersonTagChartByOrgId, params);
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        tagChart: result
                    }
                })
            }
        },
        * getPersonChartByOrgId({ payload }, { put, call, select }) {
            let params = ''
            if (payload) {
                params = payload;
            } else {
                params = yield select(store => store.people.getChartsParam.orgunitId);
            }
            const chartTotal = yield select(store => store.people.chartTotal);
            const response = yield call(getPersonChartByOrgId, params);
            let genderNum = 0
            let censusNum = 0
            let ageNum = 0
            if (isApiSuccess(response)) {
                const result = apiData(response);
                let genderArr = result.genderData ? result.genderData : []
                let censusArr = result.censusData ? result.censusData : []
                let ageArr = result.ageData ? result.ageData : []
                genderArr.map((v) => {
                    genderNum += v.count
                })
                censusArr.map((v) => {
                    censusNum += v.count
                })
                ageArr.map((v) => {
                    ageNum += v.count
                })
                yield put({
                    type: 'success',
                    payload: {
                        personChart: result,
                        chartTotal: {
                            ...chartTotal,
                            genderTotal: genderNum !== 0 ? genderNum : 1,
                            censusTotal: censusNum !== 0 ? censusNum : 1,
                            ageTotal: ageNum !== 0 ? ageNum : 1
                        }
                    }
                })
            }
        },
        * getChartsInit({ payload }, { put, call, select }) {
            let orgunitId = '';
            if (payload) {
                orgunitId = payload.orgunitId;
            }

            const response = yield call(getAllVillage, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        allVillage: result
                    }
                });
                yield put({ type: 'getPersonTagChartByOrgId', payload: { orgunitId: orgunitId ? orgunitId : result[0].id } });
                yield put({ type: 'getPersonChartByOrgId', payload: { orgunitId: orgunitId ? orgunitId : result[0].id } })
            }
        },
        * getHouseInfoByPersonId({ payload }, { put, call, select }) {
            const id = yield select(store => store.people.personId);
            const response = yield call(getHouseInfoByPersonId, { id });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        houseInfo: result,
                        houseId: result[0].houseId
                    }
                });
                yield put({
                    type: 'getUtilitiesDate',
                    payload: {
                        houseId: result[0].houseId
                    }
                });
            }
        },
        * getCarInfoByPersonId({ payload }, { put, call, select }) {
            const response = yield call(getCarInfoByPersonId, { id: payload.id });

            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        carInfo: result
                    }
                })
            }
        },
        * getPersonAccessControlById({ payload }, { put, call, select }) {
            const id = yield select(store => store.people.personId);
            const response = yield call(getPersonAccessControlById, { id });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        personAccess: result
                    }
                })
            }
        },
        * getPersonDetailById({ payload }, { put, call, select }) {
            const response = yield call(getPersonDetailById, { id: payload.id });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        personDetail: result
                    }
                })
            }
        },
        * getPersonFacePerveiceById({ payload }, { put, call, select }) {
            const id = yield select(store => store.people.personId);
            const response = yield call(getPersonFacePerveiceById, { id });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        personFace: result
                    }
                })
            }
        },
        * getUtilitiesDate({ payload }, { put, call, select }) {
            const response = yield call(getUtilitiesDate, { houseId: payload.houseId });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        UtilitiesDateList: result,
                        utilitiesParams: result[0].month
                    }
                });
                yield put({
                    type: 'getUtilities'

                })
            }
        },
        * getUtilities({ payload }, { put, call, select }) {
            const houseId = yield select(store => store.people.houseId);
            const date = yield select(store => store.people.utilitiesParams);
            const params = {
                houseId,
                date
            }
            const response = yield call(getUtilities, { ...params });
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        utilityData: result
                    }
                });
            }
        }
    },
    reducers: {
        success(state, action) {
            return { ...state, ...action.payload };
        }
    },
};
