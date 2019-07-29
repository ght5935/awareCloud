

import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import moment from 'moment';
import { Icon, Input, Button, Radio, Row, Col, Select, DatePicker, Pagination } from 'antd';
import Slogen from '../../components/common/Slogen';

import Card from '../../components/common/Card';
import DetailCar from '../../components/aware/DetailCar';
import TrackCar from '../../components/aware/TrackCar';

import * as Utils from '../../utils/utils';
import style from '../../style/common/common.css';

import styles from './index.css';
import w from '../../assets/w.jpg';

const Option = Select.Option;
const { RangePicker } = DatePicker;
class Car extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagType: '0',
            sizeDate: 'all',
            beginTime: '',
            overTime: ''
        };
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'awareCar/getAllVillage'
        })
        this.props.dispatch({
            type: 'awareCar/getProvince'
        })
        this.props.dispatch({
            type: 'awareCar/getListCar'
        })
    }
    onSelectVillage = value => {
        const awareChart = this.props.awareCar.carChart
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                awareChart: {
                    ...awareChart,
                    villageId: value
                }
            }
        })
    }
    onSemtChange = value => {
        const searchParams = this.props.awareCar.searchParams
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    orgunitId: value
                }
            }
        })
        this.props.dispatch({
            type: 'awareCar/getCameras'
        })
    }
    onCameraChange = value => {
        const searchParams = this.props.awareCar.searchParams
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    cameraId: value
                }
            }
        })
    }

    onTimeChange = (data, dateString) => {

        const searchParams = this.props.awareCar.searchParams
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    pageSize: 12,
                    pageNo: 1,
                    startTime: dateString[0],
                    endTime: dateString[1]
                }
            }
        })
        this.setState({
            sizeDate: 'none',
            beginTime: dateString[0],
            overTime: dateString[1]
        })
        if (data && data.length == 0) {
            this.setState({
                sizeDate: 'all',
            })
        }
    }
    onDateChange = (e) => {
        const searchParams = this.props.awareCar.searchParams
        let timestamp = Math.round(new Date() / 1000)
        let startData;
        let endData = Utils.timestampToTime(timestamp);
        this.setState({ sizeDate: e.target.value });
        switch (e.target.value) {
            case 'oneD':
                startData = Utils.timestampToTime(timestamp - 24 * 60 * 60)
                break;
            case 'sevenD':
                startData = Utils.timestampToTime(timestamp - 24 * 60 * 60 * 7)
                break;
            case 'halfM':
                startData = Utils.timestampToTime(timestamp - 24 * 60 * 60 * 15)
                break;
            case 'oneM':
                startData = Utils.timestampToTime(timestamp - 24 * 60 * 60 * 30)
                break;
            case 'halfY':
                startData = Utils.timestampToTime(timestamp - 24 * 60 * 60 * 30 * 6)
                break;
            case 'oneY':
                startData = Utils.timestampToTime(timestamp - 24 * 60 * 60 * 30 * 12)
                break;
            case 'all':
                startData = ''
                break;
        }
        this.setState({
            beginTime: startData,
            overTime: endData
        })
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    pageSize: 12,
                    pageNo: 1,
                    startTime: startData,
                    endTime: endData
                }
            }
        });
    }
    onSelectProvince = value => {
        const searchParams = this.props.awareCar.searchParams
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    province: value
                }
            }
        })
    }
    onSelectLicences = e => {
        const searchParams = this.props.awareCar.searchParams
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    plateNumber: e.target.value
                }
            }
        })
    }
    onSelectType = value => {
        const searchParams = this.props.awareCar.searchParams
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    model: value
                }
            }
        })
    }
    onSelectName = (e) => {
        const searchParams = this.props.awareCar.searchParams
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    name: e.target.value
                }
            }
        })
    }
    onSelectPhone = (e) => {
        const searchParams = this.props.awareCar.searchParams
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    phone: e.target.value
                }
            }
        })
    }
    onTypeChange = (e) => {
        this.setState({ tagType: e.target.value })
        const searchParams = this.props.awareCar.searchParams
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    plateType: e.target.value
                }
            }
        })
    }
    onSearch = () => {
        this.props.dispatch({
            type: 'awareCar/getListCar'
        })
    }
    detailCard = v => {
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                detailVisible: true,
                modelData: v
            }
        })
    }
    onCancel = () => {
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                detailVisible: false,
                trackVisible: false,
            }
        })
    }
    renderCard = data => {
        return data.map((v, i) => (
            <div className={styles.carCard} key={i} onClick={this.detailCard.bind(this,v)}>
                <dl>
                    <dt><img src={v.img} /></dt>
                    <dd>摄像头: {v.camera} </dd>
                    <dd>时&nbsp;&nbsp;&nbsp;间: {v.captureTime}</dd>
                    <dd>姓&nbsp;&nbsp;&nbsp;名: {v.poiName}</dd>
                    <dd>车&nbsp;&nbsp;&nbsp;牌: {v.plate}</dd>
                    <dd>车&nbsp;&nbsp;&nbsp;型: {v.model}</dd>
                    <dd>标&nbsp;&nbsp;&nbsp;签: {v.plateType}</dd>
                    <dd>电&nbsp;&nbsp;&nbsp;话: {v.phone}</dd>
                </dl>
            </div>
        ))
    }

    onPageChange = (page, pageSize) => {
        const searchParams = this.props.awareCar.searchParams
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    pageNo: page,
                    pageSize
                }
            }
        })
        this.props.dispatch({
            type: 'awareCar/getListCar'
        })
    }
    render() {

        return (
            <div className={styles.aware}>
                <div className={styles.awareTop}>
                    <Slogen type={0}>
                        <Row>
                            <Col span={24} className={styles.selectTop}>
                                <Select
                                    style={{ width: '50%' }}
                                    dropdownMatchSelectWidth={false}
                                    onChange={this.onSelectVillage}
                                    value={`${this.props.awareCar.awareChart.villageId}`}
                                >
                                    {
                                        this.props.awareCar.AllVillageList.map((value, i) =>
                                            <Option key={i} value={`${value.id}`}>{value.name}</Option>
                                        )
                                    }
                                </Select>
                            </Col>
                        </Row>
                    </Slogen>
                    <div className={styles.linkBtn} style={{ marginTop: 10 }}>
                        <Link to='/aware'>
                            <div className={styles.btn}>感知统计</div>
                        </Link>
                    </div>
                </div>
                <div className={styles.carCenter}>
                    <Card titleLeft={'查找'}>
                        <Row className={styles.searchForm}>
                            <Col span={7}>
                                <span className={styles.label}>社区</span>
                                <Select
                                    value={this.props.awareCar.searchParams.orgunitId}
                                    onChange={this.onSemtChange}
                                    style={{ width: '35%' }}
                                >
                                    <Option value="">全部</Option>
                                    {
                                        this.props.awareCar.AllVillageList.map((value, i) =>
                                            <Option key={i} value={`${value.id}`}>{value.name}</Option>
                                        )
                                    }
                                </Select>
                                <span style={{ color: '#FFF' }}> - </span>
                                <span className={styles.label}>摄像头</span>
                                <Select
                                    value={this.props.awareCar.searchParams.cameraId}
                                    onChange={this.onCameraChange}
                                    style={{ width: '35%' }}
                                >
                                    {
                                        this.props.awareCar.camerasList.map((value, i) =>
                                            <Option key={i} value={`${value.id}`}>{value.name}</Option>
                                        )
                                    }
                                </Select>
                            </Col>
                            <Col span={7}>
                                <span className={styles.label}>时间</span>
                                <RangePicker
                                    showTime
                                    allowClear
                                    format="YYYY-MM-DD"
                                    style={{ width: '24.4rem', 'background': 'transparent' }}
                                    onChange={this.onTimeChange}
                                    value={this.state.sizeDate !== 'all' ? [moment(this.state.beginTime, 'YYYY-MM-DD'), moment(this.state.overTime, 'YYYY-MM-DD')] : null}
                                />
                            </Col>
                            <Col span={10} className={styles.condition}>
                                <Radio.Group value={this.state.sizeDate} onChange={this.onDateChange} style={{ textAlign: 'center' }}>
                                    <Radio.Button value="oneD" style={{ width: '5rem' }} >今日</Radio.Button>
                                    <Radio.Button value="sevenD" style={{ width: '6rem' }}>最近7天</Radio.Button>
                                    <Radio.Button value="halfM" style={{ width: '6rem' }}>最近15天</Radio.Button>
                                    <Radio.Button value="oneM" style={{ width: '6rem' }}>最近30天</Radio.Button>
                                    <Radio.Button value="halfY" style={{ width: '6rem' }}>最近半年</Radio.Button>
                                    <Radio.Button value="oneY" style={{ width: '6rem' }}>最近一年</Radio.Button>
                                    <Radio.Button value="all" style={{ width: '5rem' }}>全部</Radio.Button>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <Row className={styles.searchForm}>
                            <Col span={4}>
                                <span className={styles.label}>车牌</span>
                                <Select
                                    value={this.props.awareCar.searchParams.province}
                                    onChange={this.onSelectProvince}
                                    style={{ width: '30%' }}
                                >
                                    <Option value="">全部</Option>
                                    {
                                        this.props.awareCar.provinceList.map((value, i) =>
                                            <Option key={i} value={`${value.id}`}>{value.province}</Option>
                                        )
                                    }
                                </Select>
                                <Input
                                    style={{ width: '35%' }}
                                    value={`${this.props.awareCar.searchParams.plateNumber}`}
                                    onChange={this.onSelectLicences}
                                />
                            </Col>
                            <Col span={3}>
                                <span className={styles.label}>车型</span>
                                <Select
                                    value={`${this.props.awareCar.searchParams.model}`}
                                    onChange={this.onSelectType}
                                    style={{ width: '66%' }}
                                >
                                    <Option value="">全部</Option>
                                    <Option value="0">小型车</Option>
                                    <Option value="1">大型车</Option>
                                </Select>
                            </Col>
                            <Col span={3}>
                                <span className={styles.label}>姓名</span>
                                <Input
                                    style={{ width: '66%' }}
                                    onChange={this.onSelectName}
                                    value={`${this.props.awareCar.searchParams.name}`}
                                />
                            </Col>
                            <Col span={4}>
                                <span className={styles.label}>手机号</span>
                                <Input
                                    style={{ width: '58%' }}
                                    onChange={this.onSelectPhone}
                                    value={`${this.props.awareCar.searchParams.phone}`}
                                />
                            </Col>
                            <Col span={8} className={styles.condition}>
                                <span className={styles.label}>标签</span>
                                <Radio.Group value={this.state.tagType} onChange={this.onTypeChange} style={{ textAlign: 'center' }}>
                                    <Radio.Button value="0" style={{ width: '6rem' }}>不限</Radio.Button>
                                    <Radio.Button value="1" style={{ width: '6rem' }} >本地</Radio.Button>
                                    <Radio.Button value="2" style={{ width: '6rem' }}>外地</Radio.Button>
                                </Radio.Group>
                            </Col>
                            <Col span={2} className={styles.condition}>
                                <Button type="primary" onClick={this.onSearch}>查 找</Button>
                            </Col>
                        </Row>
                    </Card>
                </div>
                <div className={styles.carBottom}>
                    {this.renderCard(this.props.awareCar.carList)}
                </div>
                <DetailCar
                    visible={this.props.awareCar.detailVisible}
                    width={868}
                    titleLeft={this.state.resultLabel}
                    maskClosable={true}
                    onCancel={this.onCancel}
                />
                <TrackCar
                    visible={this.props.awareCar.trackVisible}
                    width={868}
                    titleLeft={this.state.resultLabel}
                    maskClosable={true}
                    onCancel={this.onCancel}
                />
                <Pagination
                    className={style.pagination}
                    current={this.props.awareCar.searchParams.pageNo}
                    showQuickJumper
                    onChange={this.onPageChange}
                    defaultPageSize={12}
                    showTotal={total => `共 ${total} 条`}
                    total={this.props.awareCar.carList.length}
                />
            </div >
        )
    }
}

export default connect((state, action) => {
    return { ...state, ...action }
})(Car);
