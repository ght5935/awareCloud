

import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Select } from 'antd';

import Slogen from '../../components/common/Slogen';
import Circle from '../../components/common/Circle';
import Card from '../../components/common/Card';
import QueryCard from '../../components/common/QueryCard';
import InfoCard from '../../components/common/InfoCard';
import UnreglarTitle from '../../components/common/UnreglarTitle';

import InfoCar from '../../components/house/InfoCar';
import InfoPerson from '../../components/house/InfoPerson';
import InfoAlarm from '../../components/house/InfoAlarm';
import InfoPersonId from '../../components/house/InfoPersonId';

import style from '../../style/common/common.css';
import styles from './index.css';

import * as Utils from '../../utils/utils';

import car01 from '../../assets/indeedHouse/houseInfo/car01.png';
import person01 from '../../assets/indeedHouse/houseInfo/person01.png';
import alarm01 from '../../assets/indeedHouse/houseInfo/alarm01.png';
import w from '../../assets/w.jpg';
import r from '../../assets/r.jpeg';

const Option = Select.Option;

class Info extends React.Component {
    state = {
        circleIndex: 0,
        timestamp: Math.round(new Date() / 1000)
    }
    componentDidMount() {
        const house = this.props.house;
        const houseInfo = house.houseInfo;
        let id = this.props.location.query;
        this.props.dispatch({
            type: 'house/success',
            payload: {
                houseInfo: {
                    ...houseInfo,
                    houseId: id.houseId
                }
            }
        });
        this.props.dispatch({
            type: 'house/getHouseInfo'
        })
    }
    onSelectDate = (value) => {
        const houseInfo = this.props.house.houseInfo;
        this.props.dispatch({
            type: 'house/success',
            payload: {
                houseInfo: {
                    ...houseInfo,
                    utilityDate: value
                }
            }
        });
        this.props.dispatch({
            type: 'house/getUtilities'
        })
    };
    imgClick = (key) => {
        this.setState({
            circleIndex: key
        })

    }
    renderCircle = (key) => {
        const houseInfo = this.props.house.houseInfo;
        let Ele;
        let detail;
        if (houseInfo.personDetail) {
            detail = <InfoPersonId />
        } else {
            detail = <InfoPerson />
        }
        switch (key) {
            case 0:
                Ele = <InfoCar />
                break;
            case 1:
                Ele = detail
                break;
            case 2:
                Ele = <InfoAlarm />
                break;
        }
        return Ele
    }
    render() {
        const houseInfo = this.props.house.houseInfo;
        const houseInfoData = houseInfo.houseInfoData;
        return (
            <div className={styles.info}>
                <div className={styles.infoTop}>
                    <Slogen type={0}>
                        <Row>
                            <Col span={24} className={styles.selectTop}>
                                <span className={styles.title}>实有房屋</span>
                                <span className={styles.title} style={{ fontSize: 15 }}>-一屋一档</span>
                            </Col>
                        </Row>
                    </Slogen>
                </div>
                <div className={styles.infoContent}>
                    <div className={styles.infoLeft}>
                        <Card titleLeft={houseInfoData.address ? houseInfoData.address : '房屋'}>
                            <Row gutter={10} className={styles.middleRow}>
                                <Col span={24}>
                                    <div className={styles.infoLeftBg} >
                                        <img src={houseInfoData.houseImage} />
                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={10} className={styles.middleRow}>
                                <Col span={24}>
                                    <div className={styles.infoLeftCon}>
                                        <div style={{ marginBottom: 10 }}>
                                            <UnreglarTitle
                                                title={"房屋信息"}
                                            />
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 房屋类型 </span>
                                            <span className={styles.infoLeftTxt}> {houseInfoData.houseType} </span>
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 房屋属性 </span>
                                            <span className={styles.infoLeftTxt}> {houseInfoData.houseAttribute} </span>
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 房屋面积 </span>
                                            <span className={styles.infoLeftTxt}>{houseInfoData.area ? `${houseInfoData.area}平方米` : ''}</span>
                                        </div>
                                        {/* <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 与户主关系 </span>
                                            <span className={styles.infoLeftTxt}> 户主 </span>
                                        </div> */}
                                        <div style={{ marginBottom: 10 }}>
                                            <UnreglarTitle
                                                title={"水电煤"}
                                            />
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 水 </span>
                                            <span className={styles.infoLeftTxt}>
                                                {houseInfo.utilityData.waterConsumption ? houseInfo.utilityData.waterConsumption : '0'}(立方米)
                                            </span>
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 电 </span>
                                            <span className={styles.infoLeftTxt}>
                                                {houseInfo.utilityData.electricConsumption ? houseInfo.utilityData.electricConsumption : '0'}(千瓦时)
                                            </span>
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 煤 </span>
                                            <span className={styles.infoLeftTxt}>
                                                {houseInfo.utilityData.gasConsumption ? houseInfo.utilityData.gasConsumption : '0'} (立方米)
                                            </span>
                                        </div>
                                        <div className={styles.infoLeftTime}>
                                            <Select
                                                style={{ width: '100%' }}
                                                onChange={this.onSelectDate}
                                                value={`${houseInfo.utilityDate}`}
                                            >
                                                {houseInfo.UtilitiesDateList && houseInfo.UtilitiesDateList.length > 0 ?
                                                    houseInfo.UtilitiesDateList.map((value, i) =>
                                                        <Option
                                                            key={i}
                                                            value={`${value.month}`}>{value.month}</Option>
                                                    ) : null}
                                            </Select>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                    <div className={styles.infoCenter}>
                        <Circle
                            imgSrcs={[car01, person01, alarm01]}
                            imgClick={this.imgClick}
                            selectedKey={this.state.circleIndex}
                        />
                    </div>
                    <div className={styles.infoRight}>
                        {this.renderCircle(this.state.circleIndex)}
                    </div>
                </div>
                <div className={styles.infoBottom}>
                    <QueryCard
                        leftTxt={'信息查询'}
                    >
                        <span style={{ fontSize: 15 }}>
                            {Utils.timestampToTime(this.state.timestamp)}，
                            李森警官，编号039292，
                            查阅了
                        <span style={{ color: '#0F8BB7' }}>{houseInfoData.address} </span>
                            的房屋档案。</span>
                    </QueryCard>
                </div>
            </div>
        );
    }
}


export default connect((state, action) => {
    return { ...state, ...action }
})(Info);
