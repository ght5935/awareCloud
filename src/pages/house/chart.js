

import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon, Input, Button, Row, Col, Select } from 'antd';
import { PieChart, Pie, Legend, Tooltip, Cell, Text, Label, ResponsiveContainer, Bar, XAxis, BarChart, LabelList, CartesianGrid } from 'recharts';

import Slogen from '../../components/common/Slogen';
import QueryCard from '../../components/common/QueryCard';
import Card from '../../components/common/Card';
import InfoCard from '../../components/common/InfoCard';
import ChartLabel from './chartLabel';

import style from '../../style/common/common.css';
import styles from './index.css';

import searchIcon from '../../assets/common/search-icon.png'

const Option = Select.Option;
class Chart extends React.Component {
    state = {
        houseTypeTotal: ''
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'house/getAllVillage'
        })
        this.props.dispatch({
            type: 'house/getVillageChart'
        })
    }
    onSelectVillage = (value) => {
        const house = this.props.house;
        const houseChart = house.houseChart;
        this.props.dispatch({
            type: 'house/success',
            payload: {
                houseChart: {
                    ...houseChart,
                    villageId: value - 0
                }
            }
        });
        this.props.dispatch({
            type: 'house/getVillageChart'
        })
    }
    renderTypeLabel = data => {
        const totalNum = this.props.house.houseChart.houseTypeTotal !== 0 ? this.props.house.houseChart.houseTypeTotal : 1
        let typeData = data ? data : []
        return typeData.map((item, idx) => {
            return <ChartLabel
                key={idx}
                titLabel={item.houseAttribute}
                titCon={`${((item.count / totalNum) * 100).toFixed(2)}%`}
            >
                <span className={styles.LabelBg} style={{ background: `${item.htmlColor}` }}></span>
            </ChartLabel>
        }
        )
    }
    tooltipType = (props) => {
        const payload = props.payload ? props.payload : []
        return (
            payload.map((entry, index) => (
                <div style={{ background: '#fff', padding: 10, boxSizing: 'boeder-box' }} key={index}>
                    {/* <p >{`${entry.payload.houseAttribute}: ${entry.payload.count}`}</p> */}
                    <p >{`${entry.payload.houseAttribute}`}</p>
                </div>
            ))
        )
    }
    tooltipType1 = (props) => {
        const payload = props.payload ? props.payload : []
        return (
            payload.map((entry, index) => (
                <div style={{ background: '#fff', padding: 10, boxSizing: 'boeder-box' }} key={index}>
                    <p >{`${entry.payload.houseAttention}: ${entry.payload.count}`}</p>
                </div>
            ))
        )
    }
    tooltipType2 = (props) => {
        const payload = props.payload ? props.payload : []
        return (
            payload.map((entry, index) => (
                <div style={{ background: '#fff', padding: 10, boxSizing: 'boeder-box' }} key={index}>
                    <p >{`${entry.payload.type}: ${entry.payload.amount}`}</p>
                </div>
            ))
        )
    }
    attentionList = (data) => {
        const dataList = data ? data : []
        return dataList.map((v, i) => ({ count: v.count, houseAttention: v.houseAttention == 0 ? '一般' : '重点' }))
    }
    render() {
        const house = this.props.house;
        const houseChart = house.houseChart;
        const chartData = houseChart.VillageChartList;
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
                                    value={`${houseChart.villageId}`}
                                >
                                    {house.AllVillageList && house.AllVillageList.length > 0 ?
                                        house.AllVillageList.map((value, i) =>
                                            <Option
                                                key={i}
                                                value={`${value.id}`}>{value.name}</Option>
                                        ) : null}
                                </Select>
                            </Col>
                        </Row>
                    </Slogen>
                    <div className={styles.linkBtn} style={{ marginTop: 10 }}>
                        <Link to='/house'>
                            <div className={styles.btn}>地图信息</div>
                        </Link>
                    </div>

                    <div className={styles.topTotal}>
                        <QueryCard>
                            <span>
                                本区域实有房屋数：
                            <span className={styles.topNumber}>{chartData.houseCount ? chartData.houseCount : 0}</span>
                            </span>
                        </QueryCard>
                    </div>
                </div>
                <div className={styles.chartCenter}>
                    <Row>
                        <Col span={12}>
                            <div className={styles.chartsContain}>
                                <Card titleLeft={'房屋属性'}>
                                    <div className={styles.chartsCard}>
                                        <div className={styles.PieCard}>
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={chartData.houseAttributeCountDataList}
                                                        innerRadius={60}
                                                        outerRadius={80}
                                                        dataKey="count"
                                                    >
                                                        {
                                                            chartData.houseAttributeCountDataList ? chartData.houseAttributeCountDataList.map((item, idx) => <Cell stroke={item.htmlColor} fill={item.htmlColor} key={idx} />) : ''
                                                        }
                                                        <Label
                                                            position="center"
                                                            value="房屋属性"
                                                            fill="#DBDBDB"
                                                        />
                                                    </Pie>
                                                    <Tooltip
                                                        cursor={{ fill: 'rgba(0,0,0,.2)' }}
                                                        wrapperStyle={{ background: 'rgba(255,255,255,.3)' }}
                                                        cursor={false}
                                                        content={this.tooltipType}
                                                    />
                                                </PieChart>
                                            </ResponsiveContainer>
                                        </div>
                                        <div className={styles.PieCardTxt}>
                                            {this.renderTypeLabel(chartData.houseAttributeCountDataList)}
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Col>
                        <Col span={12}>
                            <Card titleLeft={'关注度'}>
                                <div className={styles.chartsCard}>
                                    <div className={styles.BarCard}>
                                        <ResponsiveContainer width="100%" height="100%">
                                            <BarChart data={this.attentionList(chartData.houseAttentionCountDataList)}>
                                                <defs>
                                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#9A4444" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#9A4444" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#EA218C" />
                                                        <stop offset="95%" stopColor="#9A4444" />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid stroke="#3F576F" />
                                                <XAxis dataKey="houseAttention" stroke="#DBDBDB" />
                                                <Tooltip
                                                    cursor={{ fill: 'rgba(0,0,0,.2)' }}
                                                    wrapperStyle={{ background: 'rgba(255,255,255,.3)' }}
                                                    content={this.tooltipType1}
                                                />
                                                <Bar dataKey="count" barSize={40} fill="url(#colorUv)">
                                                    <LabelList dataKey="count" position="center" fill="#DBDBDB" />
                                                </Bar>
                                            </BarChart>
                                        </ResponsiveContainer>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>

                </div>
                <div className={styles.chartBottom}>
                    <Row>
                        <Col span={24}>
                            <Card titleLeft={'房屋类型'}>
                                <div className={styles.BarCard}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={chartData.houseTypeAmountData}>
                                            <CartesianGrid stroke="#3F576F" />
                                            <XAxis dataKey="type" stroke="#DBDBDB" />
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
