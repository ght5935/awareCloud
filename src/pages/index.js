import React from 'react';
import Link from 'umi/link';
import router from 'umi/router'
import { connect } from 'dva';
import { Row, Col } from 'antd';
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, LabelList } from 'recharts';

import Card from '../components/common/Card';
import Slogen from '../components/common/Slogen';
import InfoiconCard from '../components/common/InfoiconCard';
import TotalCard from '../components/common/totalCard';
import InfoCard from '../components/common/InfoCard';
import TitleCountCard from '../components/common/TitleCountCard';
import Circle from '../components/common/Circle';
import UnreglarTitle from '../components/common/UnreglarTitle';
import ModalCard from '../components/common/ModalCard';
import QueryCard from '../components/common/QueryCard';

import CarSearchModal from '../components/index/carSearchModal';
import PeopleSearchModal from '../components/index/peopleSearchModal';

import HouseSearchModal from '../components/index/houseSearchModal';



import styles from './index.css'

import peopleIcon from '../assets/home/people-icon.png';
import houseIcon from '../assets/home/house-icon.png';
import carIcon from '../assets/home/car-icon.png';
import smPersonIcon from '../assets/home/indeed-entry-icon.png';
import smHouseIcon from '../assets/home/indeed-house-icon.png';
import smCarIcon from '../assets/home/indeed-car-icon.png';
import smPhoneIcon from '../assets/home/phone-icon.png';
import smSafetyIcon from '../assets/home/indeed-safety-icon.png';

import circleCar from '../assets/indeedHouse/houseInfo/car01.png';
import circleAlarm from '../assets/indeedHouse/houseInfo/alarm01.png';
import circleHouse from '../assets/indeedHouse/houseInfo/house01.png';
import circlePerson from '../assets/indeedHouse/houseInfo/person01.png';

import bdmap from '../assets/common/map.png';


function BarTick(props) {
    const { x, y, payload } = props;
    return (
        <text x={x} y={y + 10} fill="#ccc" textAnchor="middle" dominantBaseline="middle">{props.payload.value}</text>
    )
}
function docClick(e) {
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
        type: 'global/success',
        payload: {
            // searchModalVisiable: false
        }
    })
}

class IndexPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        }
    }
    testModal = () => {
        const v = this.state.visible
        this.setState({
            visible: !v
        })
    }
    componentDidMount() {
        window.g_app._store.dispatch({
            type: 'global/five_real'
        })
        window.g_app._store.dispatch({
            type: 'global/getFacilities'
        })
        window.g_app._store.dispatch({
            type: 'global/getSecurity'
        })

        window.g_app._store.dispatch({
            type: 'global/getTodayFace'
        })
        window.g_app._store.dispatch({
            type: 'global/getOrgWeek'
        })
        this.props.dispatch({
            type: 'global/getHouseAttribute'
        })
        this.props.dispatch({
            type: 'global/getProvince'
        })
        this.props.dispatch({
            type: 'global/getPlateType'
        })
        document.addEventListener('click', docClick)
    }
    componentWillUnmount() {
        document.removeEventListener('click', docClick)
    }
    onSearchIconClick = (i, e) => {

        this.setState({
            searchKey: i
        });
        window.g_app._store.dispatch({
            type: 'global/success',
            payload: {
                searchModalVisiable: true
            }
        });

    }
    renderFacilities = data => {
        let facilities = data ? data : []
        return facilities.map((v, i) => (
            <div key={i} className={styles.totalNumber}>
                <InfoCard
                    titleLabel={v.name}
                    titleCon={v.size}
                />
            </div>
        ))
    }
    renderSecurity = data => {
        let security = data ? data : []
        return security.map((v, i) => (
            <div key={i} className={styles.totalType} >
                <TotalCard
                    totalLabel={v.name}
                    totalCon={v.size}
                />
            </div>
        ))
    }
    renderSearchModal = () => {
        let rt = ''
        switch (this.state.searchKey) {
            case 0:
                rt = <PeopleSearchModal visiable={this.props.searchModalVisiable} />;
                break;
            case 1:
                rt = <HouseSearchModal visiable={this.props.searchModalVisiable} />;
                break;
            case 2:
                rt = <CarSearchModal visiable={this.props.searchModalVisiable} />;
                break;
            default:
                rt = ''
        }
        return rt;
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
        const { payload } = props
        return (
            payload.map((entry, index) => (
                <div style={{ background: '#fff', padding: 10, boxSizing: 'boeder-box' }} key={index}>
                    <p >{`${entry.payload.name}: ${entry.payload.count}`}</p>
                </div>
            ))
        )
    }
    tooltipType1 = (props) => {
        const { payload } = props
        return (
            payload.map((entry, index) => (
                <div style={{ background: '#fff', padding: 10, boxSizing: 'boeder-box' }} key={index}>
                    <p >{`${entry.payload.time}: ${entry.payload.count}`}</p>
                </div>
            ))
        )
    }
    componentWillUnmount() {
        window.g_app._store.dispatch({
            type: 'global/success',
            payload: {
                orgWeek: [],
                todayFace: []
            }
        })
    }
    render() {
        const securityData = this.props.security
        return (
            <div className={styles.index}>
                <div className={styles.indexTop}>
                    <Slogen type={1}>
                        {[peopleIcon, houseIcon, carIcon].map((v, i) =>
                            <div className={styles.link} onClick={this.onSearchIconClick.bind(this, i)} key={i}>
                                <img src={v} data-id="icon_btn" alt="" />
                            </div>)}

                    </Slogen>
                    {/* <div className={styles.centerMap}>
                        <img src={bdmap} alt="" />
                    </div> */}
                </div>
                <div className={styles.left}>
                    <Card titleLeft={'五实信息'}>
                        <Row className={styles.middleRow} gutter={20}>
                            <Col span={12}>
                                <Link to='/people'>
                                    <InfoiconCard
                                        icons={smPersonIcon}
                                        titLabel={'实有人口'}
                                        titCon={this.props.fiveReal.personTotal}
                                        iSarrow={true}
                                    />
                                </Link>
                            </Col>
                            <Col span={12}>
                                <Link to='/house'>
                                    <InfoiconCard
                                        icons={smHouseIcon}
                                        titLabel={'实有房屋'}
                                        titCon={this.props.fiveReal.houseTotal}
                                        iSarrow={true}
                                    />
                                </Link>
                            </Col>
                        </Row>
                        <Row className={styles.middleRow} gutter={20}>
                            <Col span={12}>
                                <Link to='/car'>
                                    <InfoiconCard
                                        icons={smCarIcon}
                                        titLabel={'实有车辆'}
                                        titCon={this.props.fiveReal.carTotal}
                                        iSarrow={true}
                                    />
                                </Link>
                            </Col>
                            <Col span={12}>
                                <InfoiconCard
                                    icons={smPhoneIcon}
                                    titLabel={'实有手机'}
                                    titCon={this.props.fiveReal.phoneTotal}
                                    iSarrow={true}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <InfoiconCard
                                    icons={smSafetyIcon}
                                    titLabel={'实有消防/安防设施'}
                                    titCon={`${this.props.fiveReal.facilitiesTotal}/${this.props.fiveReal.securityTotal}`}
                                    iSarrow={true}
                                />
                            </Col>
                        </Row>
                    </Card>
                    <Card titleLeft={'消防设施'}>
                        {/* <Row className={styles.middleRow} gutter={20}>
                            <Col span={8}>
                                <InfoCard
                                    titleLabel={'灭火器'}
                                    titleCon={this.props.facilities.fireExtinguisher}
                                />
                            </Col>
                            <Col span={8}>
                                <InfoCard
                                    titleLabel={'消火栓'}
                                    titleCon={this.props.facilities.fireHydrant}
                                />
                            </Col>
                            <Col span={8}>
                                <InfoCard
                                    titleLabel={'火灾感应器'}
                                    titleCon={this.props.facilities.fireSensor}
                                />
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col span={8}>
                                <InfoCard
                                    titleLabel={'烟雾传感器'}
                                    titleCon={this.props.facilities.smokeSensor}
                                />
                            </Col>
                            <Col span={8}>
                                <InfoCard
                                    titleLabel={'自动灭火器'}
                                    titleCon={this.props.facilities.automaticallyOff}
                                />
                            </Col>
                            <Col span={8}>
                                <InfoCard
                                    titleLabel={'防排烟系统'}
                                    titleCon={this.props.facilities.smokeControl}
                                />
                            </Col>
                        </Row> */}
                        <div className={styles.totalNumberCard}>
                            {this.renderFacilities(this.props.facilities)}
                        </div>
                    </Card>
                    <Card titleLeft={'安防设施'}>
                        <div className={styles.totalNumberCard}>
                            {this.renderSecurity(this.props.security)}
                        </div>
                        {/* <Row className={styles.middleRow} gutter={20}>
                            <Col span={12}>
                                <TotalCard
                                    totalLabel={'门禁'}
                                    totalCon={securityData && securityData.accessControl ? securityData.accessControl : ''}
                                />
                            </Col>
                            <Col span={12}>
                                <TotalCard
                                    totalLabel={'摄像头'}
                                    totalCon={securityData && securityData.camera ? securityData.camera : ''}
                                />
                            </Col>
                        </Row>
                        <Row className={styles.middleRow} gutter={20}>
                            <Col span={12}>
                                <TotalCard
                                    totalLabel={'巡更点位'}
                                    totalCon={securityData && securityData.patrolPoint ? securityData.patrolPoint : ''}
                                />
                            </Col>
                            <Col span={12}>
                                <TotalCard
                                    totalLabel={'可视对讲'}
                                    totalCon={securityData && securityData.videoIntercom ? securityData.videoIntercom : ''}
                                />
                            </Col>
                        </Row>
                        <Row className={styles.middleRow} gutter={20}>
                            <Col span={12}>
                                <TotalCard
                                    totalLabel={'一键报警'}
                                    totalCon={securityData && securityData.alarm ? securityData.alarm : ''}
                                />
                            </Col>
                            <Col span={12}>
                                <TotalCard
                                    totalLabel={'人脸监控系统'}
                                    totalCon={securityData && securityData.faceMonitoring ? securityData.faceMonitoring : ''}
                                />
                            </Col>
                        </Row>
                        <Row gutter={20}>
                            <Col span={12}>
                                <TotalCard
                                    totalLabel={'车辆识别系统'}
                                    totalCon={securityData && securityData.carSpot ? securityData.carSpot : ''}
                                />
                            </Col>
                        </Row> */}
                    </Card>
                </div>
                <div className={styles.right}>
                    <Card titleLeft={'感知数据总量'} titleRight={this.props.stat.total}>
                        <div style={{ width: '98%', margin: '1% auto', background: 'rgba(32, 52, 68, .7)' }}>
                            <div>
                                <UnreglarTitle title={'一周感知统计'} />
                            </div>
                            <ResponsiveContainer width="100%" height={200} >
                                <BarChart data={this.props.orgWeek} margin={{ top: 30, right: 10, left: 10, bottom: 5 }}>
                                    <defs>
                                        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#063EAF" stopOpacity={0.35} />
                                            <stop offset="95%" stopColor="#22C9DC" />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid stroke="#3F576F" />
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
                    <Card titleLeft={'今日感知增量'} titleRight={this.props.stat.todayTotal}>
                        <Row className={styles.middleRow} gutter={20}>
                            <Col span={12} onClick={this.testModal}>
                                <TitleCountCard
                                    totalLabel={'人脸统计'}
                                    totalCon={this.props.stat.faceTotal}
                                />
                            </Col>
                            <Col span={12}>
                                <TitleCountCard
                                    totalLabel={'车辆识别'}
                                    totalCon={this.props.stat.carTotal}
                                />
                            </Col>
                        </Row>
                        <Row className={styles.middleRow} gutter={20}>
                            <Col span={12}>
                                <TitleCountCard
                                    totalLabel={'手机感知'}
                                    totalCon={this.props.stat.phoneTotal}
                                />
                            </Col>
                            <Col span={12}>
                                <TitleCountCard
                                    totalLabel={'门禁感知'}
                                    totalCon={this.props.stat.accessControlTotal}
                                />
                            </Col>
                        </Row>
                        <Row className={styles.middleRow} gutter={20}>
                            <Col span={12}>
                                <TitleCountCard
                                    totalLabel={'事件感知'}
                                    totalCon={this.props.stat.eventTotal}
                                />
                            </Col>

                        </Row>
                    </Card>
                    <Card titleLeft={'人脸识别感知实时统计'}>
                        <div style={{ width: '98%', margin: '1% auto', background: 'rgba(32, 52, 68, .7)' }}>
                            <ResponsiveContainer width="100%" height={200}>
                                <LineChart data={this.props.todayFace} margin={{ top: 30, right: 10, left: 10, bottom: 5 }}>
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
                {this.props.searchModalVisiable ? this.renderSearchModal() : ''}
                <div className={styles.indexBottom}>
                    <QueryCard
                        leftTxt={'感知事件'}
                    >
                        <span style={{ fontSize: 15 }}>2018-03-24 10:25:33，心圆西苑（华夏二路1500弄），15号楼发生火灾。</span>
                    </QueryCard>
                </div>
            </div>
        )
    }
}

export default connect(state => {
    return {
        pathname: state.routing.location.pathname,
        fiveReal: state.global.fiveReal,
        facilities: state.global.facilities,
        security: state.global.security,
        stat: state.global.stat,
        todayFace: state.global.todayFace,
        orgWeek: state.global.orgWeek,
        searchModalVisiable: state.global.searchModalVisiable
    };
})(IndexPage);