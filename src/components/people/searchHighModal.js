
import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import router from 'umi/router';
import { Input, Radio, Row, Col, Select, } from 'antd';

import style from '../../style/common/common.css';
import styles from './index.css';

import * as Config from '../../utils/config';


const Option = Select.Option;

class HighSearchModal extends React.Component {
    state = {
        tagType: ''
    }
    componentDidMount() {
        window.g_app._store.dispatch({
            type: 'people/getAllNation'
        })
        window.g_app._store.dispatch({
            type: 'people/getAllTag'
        })
        window.g_app._store.dispatch({
            type: 'people/getAllPartisan'
        })
        window.g_app._store.dispatch({
            type: 'people/getAllVillage'
        })
        const totalSearchParams = this.props.totalSearchParams
        window.g_app._store.dispatch({
            type: 'people/success',
            payload: {
                totalSearchParams: {
                    ...totalSearchParams,
                    name: this.props.peopleSearch.name,
                    tag: this.props.peopleSearch.tag,
                    idCard: this.props.peopleSearch.idCard
                }
            }
        })
    }
    onNameChange = (e) => {
        const totalSearchParams = this.props.totalSearchParams
        window.g_app._store.dispatch({
            type: 'people/success',
            payload: {
                totalSearchParams: {
                    ...totalSearchParams,
                    name: e.target.value
                }
            }
        })
        this.props.dispatch({
            type: 'global/success',
            payload: {
                peopleSearch: {
                    ...this.props.global.peopleSearch,
                    name: e.target.value
                }
            }
        })
    }
    onIdCardChange = (e) => {
        const totalSearchParams = this.props.totalSearchParams
        window.g_app._store.dispatch({
            type: 'people/success',
            payload: {
                totalSearchParams: {
                    ...totalSearchParams,
                    idCard: e.target.value
                }
            }
        })
        this.props.dispatch({
            type: 'global/success',
            payload: {
                peopleSearch: {
                    ...this.props.global.peopleSearch,
                    idCard: e.target.value
                }
            }
        })
    }
    onGenderChange = (e) => {
        const totalSearchParams = this.props.totalSearchParams
        window.g_app._store.dispatch({
            type: 'people/success',
            payload: {
                totalSearchParams: {
                    ...totalSearchParams,
                    gender: e.target.value
                }
            }
        });
    }
    onPhoneChange = (e) => {
        const totalSearchParams = this.props.totalSearchParams
        window.g_app._store.dispatch({
            type: 'people/success',
            payload: {
                totalSearchParams: {
                    ...totalSearchParams,
                    phone: e.target.value
                }
            }
        });
    }
    onNationChange = (value) => {
        const totalSearchParams = this.props.totalSearchParams
        window.g_app._store.dispatch({
            type: 'people/success',
            payload: {
                totalSearchParams: {
                    ...totalSearchParams,
                    nation: value
                }
            }
        });
    }
    onTagChange = (e) => {
        const totalSearchParams = this.props.totalSearchParams
        window.g_app._store.dispatch({
            type: 'people/success',
            payload: {
                totalSearchParams: {
                    ...totalSearchParams,
                    tag: e.target.value
                }
            }
        })
        this.props.dispatch({
            type: 'global/success',
            payload: {
                peopleSearch: {
                    ...this.props.global.peopleSearch,
                    tag: e.target.value
                }
            }
        })
    }
    onCarCountChange = (e) => {
        const totalSearchParams = this.props.totalSearchParams
        window.g_app._store.dispatch({
            type: 'people/success',
            payload: {
                totalSearchParams: {
                    ...totalSearchParams,
                    carCount: e.target.value
                }
            }
        });
    }
    onPartisanIdChange = (value) => {
        const totalSearchParams = this.props.totalSearchParams
        window.g_app._store.dispatch({
            type: 'people/success',
            payload: {
                totalSearchParams: {
                    ...totalSearchParams,
                    partisanId: value
                }
            }
        });
    }
    onMaritalStatusChange = (value) => {
        const totalSearchParams = this.props.totalSearchParams
        window.g_app._store.dispatch({
            type: 'people/success',
            payload: {
                totalSearchParams: {
                    ...totalSearchParams,
                    marital_status: value
                }
            }
        });
    }
    onCensusChange = (value) => {
        const totalSearchParams = this.props.totalSearchParams
        window.g_app._store.dispatch({
            type: 'people/success',
            payload: {
                totalSearchParams: {
                    ...totalSearchParams,
                    census: value
                }
            }
        });
    }
    onOrgunitIdChange = (value) => {
        const totalSearchParams = this.props.totalSearchParams
        window.g_app._store.dispatch({
            type: 'people/success',
            payload: {
                totalSearchParams: {
                    ...totalSearchParams,
                    orgunitId: value
                }
            }
        });
    }
    onBtnClick = () => {
        window.g_app._store.dispatch({
            type: 'people/getMapSearch'
        })
        window.g_app._store.dispatch({
            type: 'global/success',
            payload: {
                searchHouseVisible: false,
            }
        })
    }
    onCancel = () => {
        const totalSearchParams = this.props.people.totalSearchParams
        window.g_app._store.dispatch({
            type: 'people/success',
            payload: {
                allTag: this.props.global.allTag,
                totalSearchParams: {
                    ...totalSearchParams,
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
                }
            }
        })
        this.props.dispatch({
            type: 'global/success',
            payload: {
                peopleSearch: {
                    ...this.props.global.peopleSearch,
                    tag: '',
                    idCard: '',
                    name: ''
                },
                searchHouseVisible: false
            }
        })
    }
    render() {
        return (
            <div className={styles.searchModal} data-id="icon_btn">
                <Row>
                    <Col span={10} className={styles.condition}>
                        <div className={styles.label}>姓名：</div>
                        <Input
                            value={this.props.totalSearchParams.name}
                            style={{ width: '67.5%' }}
                            onChange={this.onNameChange}
                        />
                    </Col>
                    <Col span={14} className={styles.condition}>
                        <div className={styles.label}>身份证号：</div>
                        <Input
                            value={this.props.totalSearchParams.idCard}
                            style={{ width: '65%' }}
                            onChange={this.onIdCardChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={10} className={styles.condition}>
                        <div className={styles.label}>性别：</div>
                        <Radio.Group value={this.props.totalSearchParams.gender} onChange={this.onGenderChange} style={{ width: '67.5%', borderRadius: '4px', textAlign: 'center', height: '30px', lineHeight: '30px', background: 'rgba(32, 52, 68, .7)' }}>
                            <Radio className={style.radios} value={1}><span style={{ color: '#fff' }}>男</span></Radio>
                            <Radio className={style.radios} value={0}><span style={{ color: '#fff' }}>女</span></Radio>
                        </Radio.Group>

                    </Col>
                    <Col span={14} className={styles.condition}>
                        <div className={styles.label}>手机号码：</div>
                        <Input value={this.props.totalSearchParams.phone} onChange={this.onPhoneChange} style={{ width: '65%' }} />
                    </Col>
                </Row>
                <Row>
                    <Col span={10} className={styles.condition}>
                        <div className={styles.label}>民族：</div>
                        <Select style={{ width: '69%' }} onChange={this.onNationChange} value={this.props.totalSearchParams.nation}>
                            <Option value=''>全部</Option>
                            {this.props.allNation.map(v => <Option value={v.id} key={v.id}>{v.name}</Option>)}
                        </Select>
                    </Col>
                    <Col span={14} className={styles.condition}>
                        <div className={styles.label}>户籍：</div>
                        <Select style={{ width: '78.3%' }} value={this.props.totalSearchParams.census} onChange={this.onCensusChange}>
                            <Option value=''>全部</Option>
                            {Config.CENDSUS.map((v, i) => <Option value={i} key={i}>{v}</Option>)}
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={10} className={styles.condition}>
                        <div className={styles.label}>婚姻状况：</div>
                        <Select style={{ width: '53%' }} value={this.props.totalSearchParams.marital_status} onChange={this.onMaritalStatusChange}>
                            <Option value=''>全部</Option>
                            {Config.MARITAL_STATUS.map((v, i) => <Option value={i} key={i}>{v}</Option>)}
                        </Select>
                    </Col>
                    <Col span={14} className={styles.condition}>
                        <div className={styles.label}>党派：</div>
                        <Select style={{ width: '78.3%' }} value={this.props.totalSearchParams.partisanId} onChange={this.onPartisanIdChange}>
                            <Option value=''>全部</Option>
                            {this.props.allPartisan.map((v, i) => <Option value={v.id} key={i}>{v.name}</Option>)}
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={10} className={styles.condition}>
                        <div className={styles.label}>所属社区：</div>
                        <Select style={{ width: '53%' }} value={this.props.totalSearchParams.orgunitId} onChange={this.onOrgunitIdChange}>
                            <Option value=''>全部</Option>
                            {this.props.allVillage.map(v => <Option value={v.id} key={v.id}>{v.name}</Option>)}
                        </Select>
                    </Col>
                    <Col span={14} className={styles.condition}>
                        <div className={styles.label}>拥有车辆数：</div>
                        <Radio.Group value={this.props.totalSearchParams.carCount} onChange={this.onCarCountChange} name="carCount" className={styles.carCount} style={{ width: '63%', textAlign: 'left' }}>
                            <Radio.Button value={0}>0</Radio.Button>
                            <Radio.Button value={1}>1</Radio.Button>
                            <Radio.Button value={2}>2</Radio.Button>
                            <Radio.Button value={3}>>2</Radio.Button>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className={`${styles.condition} ${styles.tags}`}>
                        <div className={styles.label}>标签：</div>
                        <Radio.Group
                            onChange={this.onTagChange}
                            value={`${this.props.totalSearchParams.tag}`}
                            name="tag"
                            style={{ width: '88%', textAlign: 'left' }}>
                            <Radio.Button value='' className={styles.radios} >不 限</Radio.Button>
                            {
                                this.props.allTag.map(v => <Radio.Button className={styles.radios} value={`${v.id}`} key={v.id}>{v.name}</Radio.Button>)
                            }
                        </Radio.Group>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={{ textAlign: 'center' }}>
                        <Link to='/people/search' replace>
                            <span className={styles.btnOk} onClick={this.onBtnClick}>搜 索</span>
                        </Link>
                    </Col>
                    <Col span={12} style={{ textAlign: 'center' }}>
                        <span className={styles.btnOk} onClick={this.onCancel}>取 消</span>
                    </Col>
                </Row>
            </div>
        )
    }
}
export default connect(state => {
    return {
        pathname: state.routing.location.pathname,
        allNation: state.people.allNation,
        allPartisan: state.people.allPartisan,
        allTag: state.people.allTag,
        allVillage: state.people.allVillage,
        totalSearchParams: state.people.totalSearchParams,
        peopleSearch: state.global.peopleSearch,
        ...state
    };
})(HighSearchModal);