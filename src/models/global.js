import {
    five_real,
    getFacilities,
    getSecurity,
    getTodayFace,
    getOrgWeek,
    getHouseAttribute,

} from "../services/index";
import { getProvince, getPlateType } from '../services/car'
import { getAllTag } from '../services/people'
import { isApiSuccess, apiData } from "../utils/utils";
import { watchList } from '../services/webSocket';
import { WEBSOCKET_URL } from '../utils/config';
export default {
    namespace: 'global',
    state: {
        fiveReal: [],
        facilities: [],
        security: [],
        searchHouseVisible:false,
        searchModalVisiable: false,
        houseHome: {
            AttributeList: [],
            houseHomeParams: {
                villageName: '',
                attribute_id: ''
            }
        },
        provinceList: [],
        plateList: [],
        carSearch: {
            carSearchParams: {
                province: '',
                plate_number: '',
                name: '',
                plate_type: ''
            }
        },
        allTag:[],
        peopleSearch:{
            tag:'',
            idCard:'',
            name:''
        },
        stat: {
            accessControlTotal: 0,
            carTotal: 0,
            eventTotal: 0,
            faceTotal: 0,
            phoneTotal: 0,
            todayTotal: 0,
            total: 0
        },
        information: '',
        todayFace: []
    },
    subscriptions: {
        setup({ dispatch, history }) {
            return history.listen(({ pathname }) => {
                const path = ['/'];
                if (path.indexOf(pathname) !== -1) {
                    dispatch({ type: 'serverOpen', payload: { dispatch } });
                }
            });
        }
    },
    effects: {
        * serverOpen({ payload }, sagas) {
            const config = { url: WEBSOCKET_URL, namespace: 'apimsg' };
            watchList(config, data => {
                console.log('.....')
                payload.dispatch({ type: 'socketMsg', payload: { data } });
            });

        },
        * socketMsg({ payload }, { put }) {
            const stat = payload.data.stat;
            let information = ''
            console.log( payload.data)
            if (payload.information)
                information = payload.information;

            yield put({
                type: 'success',
                payload: {
                    stat,
                    information
                }
            })
            console.log('C%io','color:blue',stat)
        },
        * five_real({ payload }, { put, call, select }) {
            const response = yield call(five_real, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        fiveReal: result
                    }
                })
            }
        },
        * getFacilities({ payload }, { put, call, select }) {
            const response = yield call(getFacilities, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        facilities: result
                    }
                })
            }
        },
        * getSecurity({ payload }, { put, call, select }) {
            const response = yield call(getSecurity, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        security: result
                    }
                })
            }
        },
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
        * getOrgWeek({ payload }, { put, call, select }) {
            const response = yield call(getOrgWeek, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                yield put({
                    type: 'success',
                    payload: {
                        orgWeek: result
                    }
                })
            }
        },
        * getHouseAttribute({ payload }, { put, call, select }) {
            const houseHome = yield select(store => store.global.houseHome);
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
        * getPlateType({ payload }, { put, call, select }) {
            const response = yield call(getPlateType, {});
            if (isApiSuccess(response)) {
                const result = apiData(response);
                result.unshift({ "plateType": 0, "plateTypeStr": "不限" })
                yield put({
                    type: 'success',
                    payload: {
                        plateList: result.map(v => ({ id: v.plateType, plateTypeStr: v.plateTypeStr }))
                    }
                });
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
    },
    reducers: {
        success(state, action) {
            return { ...state, ...action.payload };
        }
    },
};
