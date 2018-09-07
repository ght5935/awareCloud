import React from 'react';
import { connect } from 'dva';
import { Row, Col, Select } from 'antd';
import Link from 'umi/link';
import QueueAnim from 'rc-queue-anim';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from 'recharts';

import Card from '../../components/common/Card';
import Slogen from '../../components/common/Slogen';
import TotalCard from '../../components/common/totalCard';
import InfoCard from '../../components/common/InfoCard';
import UnreglarTitle from '../../components/common/UnreglarTitle';
import ModalCard from '../../components/common/ModalCard';

import SearchHighModal from '../../components/people/searchHighModal'

import styles from './index.css';

import searchIcon from '../../assets/common/search-icon.png';

const Option = Select.Option;
function BarTick(props) {
    const { x, y, payload } = props;
    return (
        <text x={x} y={y + 10} fill="#ccc" textAnchor="middle" dominantBaseline="middle">{props.payload.value}</text>
    )
}
function docClick(_this, e) {
    const path = e.path;
    let flag = true;
    path.map(v => {
        try {
            if (typeof v.getAttribute == 'function') {
                if (v.getAttribute('data-id') === 'icon_btn') {
                    flag = false
                }
            }
        } catch (e) {
            throw (e)
        }
    })
    const dataId = e.target.getAttribute("data-id")
    if (dataId === 'icon_btn' || !flag) {
        return false;
    }
    window.g_app._store.dispatch({
        type: 'people/success',
        payload: {
            searchVisible: false
        }
    })
}



class People extends React.Component {
    componentDidMount() {
        var _this = this;
        // document.addEventListener('click', docClick.bind(this, _this));
        window.g_app._store.dispatch({
            type: 'people/getTodayFace'
        })
        window.g_app._store.dispatch({
            type: 'people/getMapOrgCount'
        })
        window.g_app._store.dispatch({
            type: 'people/getMapTagCount'
        })

        window.g_app._store.dispatch({
            type: 'people/getMapOrgPerceiveAndFace'
        })
    }
    componentWillUnmount() {
        var _this = this;
        // document.removeEventListener('click', docClick.bind(this, _this));
        window.g_app._store.dispatch({
            type: 'people/success',
            payload: {
                mapOrgPerceiveAndFace: [],
                todayFace: []
            }
        })
    }
    formatTodayFace = (v, c) => {
        let rt = v.split(' ')[1].split(':')
        return rt[0] + ':' + rt[1]
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
    searchModalClick = () => {
        window.g_app._store.dispatch({
            type: 'global/success',
            payload: {
                searchHouseVisible: !this.props.global.searchHouseVisible
            }
        });
    }
    render() {
        return (
            <div className={styles.people}>
                <div className={styles.peopleTop}>
                    <Slogen type={2}>
                        <Row>
                            <Col span={24} className={styles.selectTop}>
                                <span className={styles.title}>实有人口</span>
                                <span className={styles.title} style={{ fontSize: 15 }}>-人口搜索</span>
                            </Col>
                        </Row>
                        <span className={styles.searchBtn} data-id="icon_btn" onClick={this.searchModalClick}>
                            <img src={searchIcon} alt="" />
                        </span>
                    </Slogen>
                    <div className={styles.linkBtn}>
                        <Link to='/people/chart'>
                            <div className={styles.btn}>图表信息</div>
                        </Link>
                    </div>
                </div>
                <div className={styles.peopleCenter}>
                    <div className={styles.left}>
                        <Card titleLeft={'各社区人口'}>
                            <Row gutter={20}>
                                {this.props.mapOrgCount.map((v,i) => (
                                    <Col className={styles.middleRow} span={8} key={i}>
                                        <InfoCard
                                            titleLabel={v.name}
                                            titleCon={v.count}
                                        />
                                    </Col>
                                ))}

                            </Row>
                        </Card>
                        <Card titleLeft={'人口标签'}>
                            <Row gutter={20}>
                                {this.props.mapTagCount.map((v,i) => (
                                    <Col span={12} className={styles.middleRow} key={i}>
                                        <TotalCard
                                            totalLabel={v.name}
                                            totalCon={v.count}
                                        />
                                    </Col>
                                ))}

                            </Row>
                        </Card>
                    </div>
                    <div className={styles.right}>
                        <Card titleLeft={'人脸感知数据总量'} >
                            <div style={{ width: '98%', margin: '1% auto', background: 'rgba(32, 52, 68, .7)' }}>
                                <div>
                                    <UnreglarTitle title={'今日感知增量'} />
                                </div>
                                <ResponsiveContainer width="100%" height={200} >
                                    <BarChart data={this.props.mapOrgPerceiveAndFace.perceiveData} margin={{ top: 30, right: 10, left: 10, bottom: 5 }}>
                                        <defs>
                                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#063EAF" stopOpacity={0.35} />
                                                <stop offset="95%" stopColor="#22C9DC" />
                                            </linearGradient>
                                        </defs>
                                        {/* <CartesianGrid stroke="#3F576F" /> */}
                                        <XAxis tick={<BarTick />} dataKey="name" stroke="#ccc" />
                                        <Tooltip cursor={{ fill: 'rgba(0,0,0,.2)' }} wrapperStyle={{ background: 'rgba(255,255,255,.3)' }} />
                                        <Bar dataKey="count" barSize={20} fill="url(#colorPv)">
                                            <LabelList dataKey="count" content={this.renderCustomizedLabel} />
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                        <Card titleLeft={'人脸识别感知实时统计'} >
                            <div style={{ width: '98%', margin: '1% auto', background: 'rgba(32, 52, 68, .7)' }}>
                                <ResponsiveContainer width="100%" height={200}>
                                    <LineChart data={this.props.todayFace} margin={{ top: 30, right: 10, left: 10, bottom: 5 }}>
                                        <XAxis dataKey="time" stroke="#3F576F" tickFormatter={this.formatTodayFace} />
                                        <YAxis />
                                        <CartesianGrid stroke="#3F576F" />
                                        <Tooltip />
                                        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                                        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </Card>
                    </div>
                    {this.props.global.searchHouseVisible ? <SearchHighModal /> : ''}
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {
        pathname: state.routing.location.pathname,
        todayFace: state.people.todayFace,
        mapOrgCount: state.people.mapOrgCount,
        mapTagCount: state.people.mapTagCount,
        mapOrgPerceiveAndFace: state.people.mapOrgPerceiveAndFace,
        searchVisible: state.people.searchVisible,
        ...state
    };
})(People);