

import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon, Input, Button, Radio, Row, Col, Select, Modal, Table } from 'antd';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from 'recharts';

import Slogen from '../../components/common/Slogen';
import Card from '../../components/common/Card';
import InfoCard from '../../components/common/InfoCard';
import TotalCard from '../../components/common/totalCard';
import UnreglarTitle from '../../components/common/UnreglarTitle';
import QueryCard from '../../components/common/QueryCard';
import SearchModal from '../../components/car/searchModal';

import style from '../../style/common/common.css';
import styles from './index.css';

import searchIcon from '../../assets/common/search-icon.png'

const Option = Select.Option
const { Column } = Table

function BarTick(props) {
    const { x, y, payload } = props;
    return (
        <text x={x} y={y + 10} fill="#ccc" textAnchor="middle" dominantBaseline="middle">{props.payload.value}</text>
    )
}


class Index extends React.Component {
    state = {

    }
    componentDidMount() {
        this.props.dispatch({
            type: 'car/getCarAmount'
        })
        this.props.dispatch({
            type: 'car/getParkingAmount'
        })
        this.props.dispatch({
            type: 'car/getTodayCarPerceive'
        })
        this.props.dispatch({
            type: 'car/getRealTimeCarPerceive'
        })
    }
    componentWillUnmount() {
        this.props.dispatch({
            type: 'people/success',
            payload: {
                mapOrgPerceiveAndFace: [],
                todayFace: [],
                searchHouseVisible: false
            }
        })
    }
    searchModalClick = () => {
        this.props.dispatch({
            type: 'global/success',
            payload: {
                searchHouseVisible: !this.props.global.searchHouseVisible,
            }
        })
        this.props.dispatch({
            type: 'car/getParkingAmount'
        })
    }
    onSelectVillage = (value) => {
        const house = this.props.house;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                selectVillage: value
            }
        });
    }
    renderHouseNum = value => {
        return value.map((item, idx) =>
            <div key={idx} className={styles.totalNumber} >
                <InfoCard
                    titleLabel={item.name}
                    titleCon={item.amount}
                />
            </div>
        )
    }
    renderCustomizedLabel = (props) => {
        const { x, y, width, height, value } = props;
        const radius = 10;

        return (
            <g>
                <text x={x + width / 2} y={y - radius} fill="#ccc" textAnchor="middle" dominantBaseline="middle" >
                    {value}
                </text>
            </g>
        );
    };
    formatTodayFace = (v, c) => {
        let rt = v.split(' ')[1].split(':')
        return rt[0] + ':' + rt[1]
    }
    tooltipType = (props) => {
        const payload = props.payload ? props.payload : []
        return (
            payload.map((entry, index) => (
                <div style={{ background: '#fff', padding: 10, boxSizing: 'boeder-box' }} key={index}>
                    <p >{`${entry.payload.name}: ${entry.payload.count}`}</p>
                </div>
            ))
        )
    }
    tooltipType1 = (props) => {
        const payload = props.payload ? props.payload : []
        return (
            payload.map((entry, index) => (
                <div style={{ background: '#fff', padding: 10, boxSizing: 'boeder-box' }} key={index}>
                    <p >{`${entry.payload.time}: ${entry.payload.count}`}</p>
                </div>
            ))
        )
    }
    render() {
        const car = this.props.car;
        const carTotal = car.carTotal;
        return (
            <div className={styles.car}>
                <div className={styles.carTop}>
                    <Slogen type={2}>
                        <Row>
                            <Col span={24} className={styles.selectTop}>
                                <span className={styles.title}>实有车辆</span>
                                <span className={styles.title} style={{ fontSize: 15 }}>-车辆统计</span>
                            </Col>
                        </Row>
                        <img src={searchIcon} className={styles.titleIcon} onClick={this.searchModalClick} />
                    </Slogen>
                    <div className={styles.linkBtn}>
                        <Link to='/car/chart'>
                            <div className={styles.btn}> 图表信息</div>
                        </Link>
                    </div>
                </div>
                <div className={styles.totalLeft}>
                    <Card titleLeft={'各社区车辆数'}>
                        <div className={styles.totalNumberCard}>
                            {this.renderHouseNum(car.carList)}
                        </div>
                    </Card>
                    <Card titleLeft={'各社区车位数统计'}>
                        <div className={styles.totalNumberCard1}>
                            <Table
                                dataSource={this.props.car.pinkingList}
                                bordered
                                pagination={false}
                                style={{ margin: 'auto', color: '#fff' }}
                                rowKey={record => record.villageName}
                            >
                                <Column
                                    title="社区名称"
                                    dataIndex="villageName"
                                    key="villageName" />
                                <Column
                                    title="总车位数"
                                    dataIndex="totalAmount"
                                    key="totalAmount" />
                                <Column
                                    title="空闲车位数"
                                    dataIndex="freeAmount"
                                    key="freeAmount" />
                            </Table>
                        </div>
                    </Card>
                </div>
                <div className={styles.totalRight}>
                    <Card
                        titleLeft={'车辆感知数据总量'}
                        titleRight={this.props.mapOrgPerceiveAndFace && this.props.mapOrgPerceiveAndFace.totalAmount ? this.props.mapOrgPerceiveAndFace.totalAmount : '0'}
                    >
                        <div style={{ width: '98%', margin: '1% auto', background: 'rgba(32, 52, 68, .7)' }}>
                            <div>
                                <UnreglarTitle title={'今日感知增量'} />
                            </div>
                            <ResponsiveContainer width="100%" height={200} >
                                <BarChart data={this.props.car.mapOrgPerceiveAndFace.perList} margin={{ top: 30, right: 10, left: 10, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#063EAF" stopOpacity={0.35} />
                                            <stop offset="95%" stopColor="#22C9DC" />
                                        </linearGradient>
                                    </defs>
                                    {/* <CartesianGrid stroke="#3F576F" /> */}
                                    <XAxis tick={<BarTick />} dataKey="name" stroke="#ccc" />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(0,0,0,.2)' }}
                                        wrapperStyle={{ background: 'rgba(255,255,255,.3)' }}
                                        content={this.tooltipType}
                                    />
                                    <Bar dataKey="count" barSize={20} fill="url(#colorPv)">
                                        <LabelList dataKey="count" content={this.renderCustomizedLabel} />
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                    <Card titleLeft={'车辆识别感知实时统计'} >
                        <div style={{ width: '98%', margin: '1% auto', background: 'rgba(32, 52, 68, .7)' }}>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={this.props.car.todayFace ? this.props.car.todayFace : ''} margin={{ top: 30, right: 10, left: 10, bottom: 5 }}>
                                    <XAxis dataKey="time" stroke="#3F576F" tickFormatter={this.formatTodayFace} />
                                    <YAxis />
                                    <CartesianGrid stroke="#3F576F" />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(0,0,0,.2)' }}
                                        wrapperStyle={{ background: 'rgba(255,255,255,.3)' }}
                                        content={this.tooltipType1}
                                    />
                                    <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                                    {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </div>
                <div className={styles.totalBottom}>
                    <QueryCard
                        leftTxt={'感知事件'}
                    >
                        <span style={{ fontSize: 15 }}>2018-03-24 10:25:33，心圆西苑（华夏二路1500弄），15号楼发生火灾。</span>
                    </QueryCard>
                </div>
                {this.props.global.searchHouseVisible ? <SearchModal /> : ''}
            </div>
        )
    }
}

export default connect((state, action) => {
    return { ...state, ...action }
})(Index);
