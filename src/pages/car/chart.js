

import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon, Input, Button, Row, Col, Select } from 'antd';
import { PieChart, Pie, Legend, Tooltip, Cell, Text, Label, ResponsiveContainer, Bar, XAxis, BarChart, LabelList, CartesianGrid } from 'recharts';

import Slogen from '../../components/common/Slogen';
import QueryCard from '../../components/common/QueryCard';
import Card from '../../components/common/Card';
import InfoCard from '../../components/common/InfoCard';
import CustomTooltip from '../../components/car/CustomTooltip';

import style from '../../style/common/common.css';
import styles from './index.css';

import searchIcon from '../../assets/common/search-icon.png'

const Option = Select.Option;
class Chart extends React.Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'car/getAllVillage'
        });
        this.props.dispatch({
            type: 'car/getCarInfoCounts'
        })
    }
    onSelectVillage = (value) => {
        const car = this.props.car;
        const carChart = car.carChart;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                carChart: {
                    ...carChart,
                    villageId: value - 0
                }
            }
        });
        this.props.dispatch({
            type: 'car/getCarInfoCounts'
        })
    }
    legendParking = (props) => {
        const { payload } = props;
        return (
            <ul style={{ listStyle: 'none' }}>
                {
                    payload.map((entry, index) => (
                        <li className={styles.legend} key={`item-${index}`}>
                            <span style={{ background: entry.color }} className={styles.legendRect}></span>
                            <span className={styles.legendText}>{entry.value === 'parkingIsFree' ? '空闲车位' : '使用车位'}</span>
                        </li>
                    ))
                }
            </ul>
        );
    }
    renderTooltip = (props) => {
        let data = []
        const payload = props.payload ? props.payload : []
        if (payload && payload.length > 0) {
            data = payload[0]
        }
        return (
            <div className={styles.tooltip}>
                <p>{data && data.payload && data.payload.parkingName ? data.payload.parkingName : ''}</p>
                <p>{data && data.payload && data.payload.parkingIsFree ? `空闲车位:${data.payload.parkingIsFree}` : ''}</p>
                <p>{data && data.payload && data.payload.parkingNotFree ? `使用车位:${data.payload.parkingNotFree}` : ''}</p>
            </div>
        )
    }
    tooltipType = (props) => {
        const payload = props.payload ? props.payload : []
        return (
            payload.map((entry, index) => (
                <div style={{ background: '#fff', padding: 10, boxSizing: 'boeder-box' }} key={index}>
                    <p >{`${entry.payload.carModel}: ${entry.payload.amount}`}</p>
                </div>
            ))
        )
    }
    tooltipType1 = (props) => {
        const payload = props.payload ? props.payload : []
        return (
            payload.map((entry, index) => (
                <div style={{ background: '#fff', padding: 10, boxSizing: 'boeder-box' }} key={index}>
                    <p >{`${entry.payload.plateType}: ${entry.payload.amount}`}</p>
                </div>
            ))
        )
    }
    tooltipType2 = (props) => {
        const payload = props.payload ? props.payload : []
        return (
            payload.map((entry, index) => (
                <div style={{ background: '#fff', padding: 10, boxSizing: 'boeder-box' }} key={index}>
                    <p >{`${entry.payload.carFlag}: ${entry.payload.amount}`}</p>
                </div>
            ))
        )
    }
    tooltipType3 = (props) => {
        const payload = props.payload ? props.payload : []
        return (
            payload.map((entry, index) => (
                <div style={{ background: '#fff', padding: 10, boxSizing: 'boeder-box' }} key={index}>
                    <p >{`${entry.payload.carSystem}: ${entry.payload.amount}`}</p>
                </div>
            ))
        )
    }
    render() {
        const car = this.props.car;
        const carChart = car.carChart;
        const chartList = carChart.chartList;
        const parkingAmountData = chartList.parkingAmountData;
        return (
            <div className={styles.chart}>
                <div className={styles.chartTop}>
                    <Slogen type={0}>
                        <Row>
                            <Col span={24} className={styles.selectTop}>
                                <Select
                                    style={{ width: '50%' }}
                                    dropdownMatchSelectWidth={false}
                                    onChange={this.onSelectVillage}
                                    value={`${carChart.villageId}`}
                                >
                                    {car.AllVillageList && car.AllVillageList.length > 0 ?
                                        car.AllVillageList.map((value, i) =>
                                            <Option
                                                key={i}
                                                value={`${value.id}`}>{value.name}</Option>
                                        ) : null}
                                </Select>
                            </Col>
                        </Row>
                    </Slogen>
                    <div className={styles.linkBtn} style={{ marginTop: 10 }}>
                        <Link to='/car'>
                            <div className={styles.btn}>地图信息</div>
                        </Link>
                    </div>

                    <div className={styles.topTotal}>
                        <QueryCard>
                            <span>
                                {parkingAmountData && parkingAmountData.villageName ? parkingAmountData.villageName : '本小区'}车位数：
                                <span className={styles.topNumber}>{parkingAmountData && parkingAmountData.totalAmount ? parkingAmountData.totalAmount : 0}</span>
                                空闲车位数：
                                <span className={styles.topNumber}>{parkingAmountData && parkingAmountData.freeAmount ? parkingAmountData.freeAmount : 0}</span>
                            </span>
                        </QueryCard>
                    </div>
                </div>
                <div className={styles.chartCenter}>
                    <Row>
                        <Col span={8}>
                            <div className={styles.chartsContain}>
                                <Card titleLeft={'车位统计'}>
                                    <div className={styles.BarCard}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <div className={styles.BarCard}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={chartList && chartList.parkingPerceiveDataList ? chartList.parkingPerceiveDataList : []}>
                                                        <CartesianGrid stroke="#3F576F" />
                                                        <XAxis dataKey="parkingName" stroke="#DBDBDB" />
                                                        <Tooltip cursor={{ fill: 'rgba(0,0,0,.2)' }} wrapperStyle={{ background: 'rgba(255,255,255,.3)' }} content={this.renderTooltip} />
                                                        <Legend verticalAlign="top" height={36} content={this.legendParking} />
                                                        <Bar dataKey="parkingIsFree" barSize={40} fill="#3D938D" label={{ position: 'center', fill: '#DBDBDB' }} />
                                                        <Bar dataKey="parkingNotFree" barSize={40} fill="#9A4444" label={{ position: 'center', fill: '#DBDBDB' }} />
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </ResponsiveContainer>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div className={styles.chartsContain}>
                                <Card titleLeft={'车型统计'}>
                                    <div className={styles.BarCard}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <div className={styles.BarCard}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={chartList && chartList.carModelAmountDataList ? chartList.carModelAmountDataList : []}>
                                                        <CartesianGrid stroke="#3F576F" />
                                                        <XAxis dataKey="carModel" stroke="#DBDBDB" />
                                                        <Tooltip
                                                            cursor={{ fill: 'rgba(0,0,0,.2)' }}
                                                            wrapperStyle={{ background: 'rgba(255,255,255,.3)' }}
                                                            content={this.tooltipType}
                                                        />
                                                        <Bar dataKey="amount" fill="#3D938D" barSize={40}>
                                                            <LabelList dataKey="amount" position="center" fill="#DBDBDB" />
                                                        </Bar>
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </ResponsiveContainer>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                        <Col span={8}>
                            <Card titleLeft={'车牌统计'}>
                                <div className={styles.chartsCard}>
                                    <div className={styles.BarCard}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <div className={styles.BarCard}>
                                                <ResponsiveContainer width="100%" height="100%">
                                                    <BarChart data={chartList && chartList.carPlateTypeAmountDataList ? chartList.carPlateTypeAmountDataList : []}>
                                                        <CartesianGrid stroke="#3F576F" />
                                                        <XAxis dataKey="plateType" stroke="#DBDBDB" />
                                                        <Tooltip
                                                            cursor={{ fill: 'rgba(0,0,0,.2)' }}
                                                            wrapperStyle={{ background: 'rgba(255,255,255,.3)' }}
                                                            content={this.tooltipType1}
                                                        />
                                                        <Bar dataKey="amount" fill="#3D938D" barSize={40}>
                                                            <LabelList dataKey="amount" position="center" fill="#DBDBDB" />
                                                        </Bar>
                                                    </BarChart>
                                                </ResponsiveContainer>
                                            </div>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                </div>
                <div className={styles.chartBottom}>
                    <Row>
                        <Col span={12}>
                            <div className={styles.chartsContain}>
                                <Card titleLeft={'车辆归属'}>
                                    <div className={styles.BarCard}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={chartList && chartList.carFlagAmountDataList ? chartList.carFlagAmountDataList : []}>
                                                <CartesianGrid stroke="#3F576F" />
                                                <XAxis dataKey="carFlag" stroke="#DBDBDB" />
                                                <Tooltip
                                                    cursor={{ fill: 'rgba(0,0,0,.2)' }}
                                                    wrapperStyle={{ background: 'rgba(255,255,255,.3)' }}
                                                    content={this.tooltipType2}
                                                />
                                                <Bar dataKey="amount" fill="#3D938D" barSize={40}>
                                                    <LabelList dataKey="amount" position="center" fill="#DBDBDB" />
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                        <Col span={12}>
                            <Card titleLeft={'车系统计'}>
                                <div className={styles.BarCard}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartList && chartList.carSystemAmountDataList ? chartList.carSystemAmountDataList : []}>
                                            <CartesianGrid stroke="#3F576F" />
                                            <XAxis dataKey="carSystem" stroke="#DBDBDB" />
                                            <Tooltip
                                                cursor={{ fill: 'rgba(0,0,0,.2)' }}
                                                wrapperStyle={{ background: 'rgba(255,255,255,.3)' }}
                                                content={this.tooltipType3}
                                            />
                                            <Bar dataKey="amount" fill="#3D938D" barSize={40}>
                                                <LabelList dataKey="amount" position="center" fill="#DBDBDB" />
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div >
        );
    }
}


export default connect((state, action) => {
    return { ...state, ...action }
})(Chart);
