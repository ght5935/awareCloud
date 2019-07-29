

import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import moment from 'moment';
import { Icon, Input, Button, Radio, Row, Col, Select } from 'antd';
import { Legend, Tooltip, ResponsiveContainer, YAxis, XAxis, LabelList, CartesianGrid, LineChart, Line } from 'recharts';
import Slogen from '../../components/common/Slogen';

import Card from '../../components/common/CardTitle';
import UnreglarTitle from '../../components/common/UnreglarTitle';

import smPeople from '../../assets/aware/people.png'
import smCar from '../../assets/aware/car.png'
import smPhone from '../../assets/aware/phone.png'
import smGate from '../../assets/aware/gate.png'

import style from '../../style/common/common.css';
import styles from './index.css';



const Option = Select.Option;
const data = [
    { time: '2018.10.01', pv: 2400, amt: 2400 },
    { time: '2018.10.02', pv: 1398, amt: 2210 },
    { time: '2018.10.03', pv: 9800, amt: 2290 },
    { time: '2018.10.04', pv: 3908, amt: 2000 },
];
class Aware extends React.Component {
    state = {
        tagType: '1'
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'aware/success',
            payload: {
                chartsParams: {
                    startTime: moment().subtract(7, 'days').format('YYYY-MM-DD 00:00:00'),
                    endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                    searchType: 1
                }
            }
        });
        this.props.dispatch({
            type: 'aware/getAllVillage'
        });
        this.props.dispatch({
            type: 'aware/getPerceiveTopTotal'
        });
        this.props.dispatch({
            type: 'aware/getPerceiveLineChart'
        })
    }
    onSelectVillage = value => {
        const awareChart = this.props.aware.carChart
        this.props.dispatch({
            type: 'aware/success',
            payload: {
                awareChart: {
                    ...awareChart,
                    villageId: value
                }
            }
        });
        this.props.dispatch({
            type: 'aware/getPerceiveTopTotal'
        });
        this.props.dispatch({
            type: 'aware/getPerceiveLineChart'
        })
        // this.props.dispatch({
        //     type: 'aware/'
        // })
    }
    onSelectTag = (e) => {
        this.setState({ tagType: e.target.value });
        const type = e.target.value;
        switch (type) {
            case '1':
                this.props.dispatch({
                    type: 'aware/success',
                    payload: {
                        chartsParams: {
                            startTime: moment().subtract(7, 'days').format('YYYY-MM-DD 00:00:00'),
                            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                            searchType: 1
                        }
                    }
                });
                break;
            case '2':
                this.props.dispatch({
                    type: 'aware/success',
                    payload: {
                        chartsParams: {
                            startTime: moment().subtract(15, 'days').format('YYYY-MM-DD 00:00:00'),
                            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                            searchType: 1
                        }
                    }
                });
                break;
            case '3':
                this.props.dispatch({
                    type: 'aware/success',
                    payload: {
                        chartsParams: {
                            startTime: moment().subtract(30, 'days').format('YYYY-MM-DD 00:00:00'),
                            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                            searchType: 1
                        }
                    }
                });
                break;
            case '4':
                this.props.dispatch({
                    type: 'aware/success',
                    payload: {
                        chartsParams: {
                            startTime: moment().subtract(0.5, 'years').format('YYYY-MM-DD 00:00:00'),
                            endTime: moment().format('YYYY-MM-DD HH:mm:ss'),
                            searchType: 2
                        }
                    }
                });
                break;
            default:
                return false;        
        }
        this.props.dispatch({
            type: 'aware/getPerceiveLineChart'
        })
    }
    // formatTodayFace = (v, c) => {
    //     let rt = v.split(' ')[1].split(':')
    //     return rt[0] + ':' + rt[1]
    // }
    // tooltipType = (props) => {
    //     const payload = props.payload ? props.payload : []
    //     return (
    //         payload.map((entry, index) => (
    //             <div style={{ background: '#fff', padding: 10, boxSizing: 'boeder-box' }} key={index}>
    //                 <p >{`${entry.payload.name}: ${entry.payload.count}`}</p>
    //             </div>
    //         ))
    //     )
    // }
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
                                    value={`${this.props.aware.awareChart.villageId}`}
                                >
                                    {
                                        this.props.aware.AllVillageList.map((value, i) =>
                                            <Option key={i} value={`${value.id}`}>{value.name}</Option>
                                        )
                                    }
                                </Select>
                            </Col>
                        </Row>
                    </Slogen>
                </div>
                <div className={styles.awareCenter}>
                    <Row>
                        <Col span={6}>
                            <div className={styles.centerCon}>
                                <Card titleCenter={'人脸感知'}>
                                    <Link to='/aware/people'>
                                        <div className={styles.centerImg}>
                                            <img src={smPeople} />
                                        </div>
                                    </Link>
                                    <div className={styles.unreglarBg}>
                                        <UnreglarTitle
                                            title={"感知总量"}
                                        />
                                        <span className={styles.unreglarTotal}>{this.props.aware.perceiveTotal.facetractHistoryTotal}</span>
                                    </div>
                                    <div className={styles.unreglarBg}>
                                        <UnreglarTitle
                                            title={"今日增量"}
                                        />
                                        <span className={styles.unreglarTotal}>{this.props.aware.perceiveTotal.facetractHistoryDayTotal}</span>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.centerCon}>
                                <Card titleCenter={'车辆感知'}>
                                    <Link to='/aware/car'>
                                        <div className={styles.centerImg}>
                                            <img src={smCar} />
                                        </div>
                                    </Link>
                                    <div className={styles.unreglarBg}>
                                        <UnreglarTitle
                                            title={"感知总量"}
                                        />
                                        <span className={styles.unreglarTotal}>{this.props.aware.perceiveTotal.carHistoryTotal}</span>
                                    </div>
                                    <div className={styles.unreglarBg}>
                                        <UnreglarTitle
                                            title={"今日增量"}
                                        />
                                        <span className={styles.unreglarTotal}>{this.props.aware.perceiveTotal.carHistoryDayTotal}</span>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.centerCon}>
                                <Card titleCenter={'手机感知'}>
                                    <div className={styles.centerImg}>
                                        <img src={smPhone} />
                                    </div>
                                    <div className={styles.unreglarBg}>
                                        <UnreglarTitle
                                            title={"感知总量"}
                                        />
                                        <span className={styles.unreglarTotal}>{this.props.aware.perceiveTotal.probeHistoryTotal}</span>
                                    </div>
                                    <div className={styles.unreglarBg}>
                                        <UnreglarTitle
                                            title={"今日增量"}
                                        />
                                        <span className={styles.unreglarTotal}>{this.props.aware.perceiveTotal.probeHistoryDayTotal}</span>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                        <Col span={6}>
                            <div className={styles.centerCon}>
                                <Card titleCenter={'门禁感知'}>
                                    <div className={styles.centerImg}>
                                        <img src={smGate} />
                                    </div>
                                    <div className={styles.unreglarBg}>
                                        <UnreglarTitle
                                            title={"感知总量"}
                                        />
                                        <span className={styles.unreglarTotal}>{this.props.aware.perceiveTotal.openDoorTotal}</span>
                                    </div>
                                    <div className={styles.unreglarBg}>
                                        <UnreglarTitle
                                            title={"今日增量"}
                                        />
                                        <span className={styles.unreglarTotal}>{this.props.aware.perceiveTotal.openDoorDayTotal}</span>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className={styles.awareBottom}>
                    <Row>
                        <Col span={24} className={styles.condition}>
                            <Radio.Group
                                value={this.state.tagType}
                                onChange={this.onSelectTag}
                                style={{ width: '100%', margin: 10, marginBottom: 0 }}>
                                <Radio.Button value={`${1}`} style={{ marginRight: 20, width: '8%' }}>最近7天</Radio.Button>
                                <Radio.Button value={`${2}`} style={{ marginRight: 20, width: '8%' }}>最近15天</Radio.Button>
                                <Radio.Button value={`${3}`} style={{ marginRight: 20, width: '8%' }}>最近30天</Radio.Button>
                                <Radio.Button value={`${4}`} style={{ marginRight: 20, width: '8%' }}>最近半年</Radio.Button>
                            </Radio.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <div style={{ width: '98%', margin: '1% auto', background: 'rgba(32, 52, 68, .7)' }}>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={this.props.aware.chartsLine} margin={{ right: 10, left: 10, bottom: 5 }}>
                                        <XAxis dataKey="day" stroke="#fff" tickFormatter={this.formatTodayFace} />
                                        <CartesianGrid stroke="#3F576F" />
                                        <Tooltip
                                            cursor={{ fill: 'rgba(0,0,0,.2)' }}
                                            wrapperStyle={{ background: 'rgba(255,255,255,.3)' }}
                                            content={this.tooltipType}
                                        />
                                        <Line type="monotone" dataKey="total" stroke="#0F99B7" activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div >
        );
    }
}


export default connect((state, action) => {
    return { ...state, ...action }
})(Aware);
