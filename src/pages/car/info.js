

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

import InfoHouse from '../../components/car/InfoHouse';
import InfoPerson from '../../components/car/InfoPerson';
import InfoCar from '../../components/car/InfoCar';
import InfoIndeed from '../../components/car/InfoIndeed';

import style from '../../style/common/common.css';
import styles from './index.css';

import * as Utils from '../../utils/utils';

import house01 from '../../assets/indeedCar/carInfo/house01.png';
import person01 from '../../assets/indeedCar/carInfo/person01.png';
import car01 from '../../assets/indeedCar/carInfo/car01.png';
import info01 from '../../assets/indeedCar/carInfo/info01.png';
import w from '../../assets/w.jpg';
import r from '../../assets/r.jpeg';

const Option = Select.Option;

class Info extends React.Component {
    state = {
        circleIndex: 0,
        timestamp: Math.round(new Date() / 1000)
    }
    componentDidMount() {
        const car = this.props.car;
        const carInfo = car.carInfo;
        let id = this.props.location.query;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                carInfo: {
                    ...carInfo,
                    carId: id.carId
                }
            }
        });
        this.props.dispatch({
            type: 'car/getCarInfo'
        });
    }
    onSelectDate = (value) => {
        const carInfo = this.props.house.carInfo;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                carInfo: {
                    ...carInfo,
                    utilityDate: value
                }
            }
        });
    };
    imgClick = (key) => {
        this.setState({
            circleIndex: key
        })

    }
    renderCircle = (key) => {
        const carInfo = this.props.car.carInfo;
        let Ele;
        switch (key) {
            case 0:
                Ele = <InfoHouse />
                break;
            case 1:
                Ele = <InfoPerson />
                break;
            case 2:
                Ele = <InfoCar />
                break;
            case 3:
                Ele = <InfoIndeed />
                break;
        }
        return Ele
    }
    render() {
        const car = this.props.car
        const carInfo = car.carInfo;
        const carInfoData = carInfo.carInfoData;
        const carBaseData = carInfoData.carBaseData;
        return (
            <div className={styles.info}>
                <div className={styles.infoTop}>
                    <Slogen type={0}>
                        <Row>
                            <Col span={24} className={styles.selectTop}>
                                <span className={styles.title}>实有车辆</span>
                                <span className={styles.title} style={{ fontSize: 15 }}>-一车一档</span>
                            </Col>
                        </Row>
                    </Slogen>
                </div>
                <div className={styles.infoContent}>
                    <div className={styles.infoLeft}>
                        <Card titleLeft={carBaseData && carBaseData.carPlate ? carBaseData.carPlate : '车牌'}>
                            <Row gutter={10} className={styles.middleRow}>
                                <Col span={24}>
                                    <div className={styles.infoLeftBg} >
                                        {
                                            carBaseData && carBaseData.carImg ?
                                                <img src={carBaseData.carImg} />
                                                : <div className={styles.noDom}> 无图片信息 </div>
                                        }

                                    </div>
                                </Col>
                            </Row>
                            <Row gutter={10} className={styles.middleRow}>
                                <Col span={24}>
                                    <div className={styles.infoLeftCon}>
                                        <div style={{ marginBottom: 10 }}>
                                            <UnreglarTitle
                                                title={"车辆信息"}
                                            />
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 车牌 </span>
                                            <span className={styles.infoLeftTxt}> {carBaseData && carBaseData.carPlate ? carBaseData.carPlate : ''} </span>
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 颜色 </span>
                                            <span className={styles.infoLeftTxt}> {carBaseData && carBaseData.color ? carBaseData.color : ''} </span>
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 车型 </span>
                                            <span className={styles.infoLeftTxt}>{carBaseData && carBaseData.model ? carBaseData.model : ''}</span>
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 车系 </span>
                                            <span className={styles.infoLeftTxt}>{carBaseData && carBaseData.carSystem ? carBaseData.carSystem : ''}</span>
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 品牌 </span>
                                            <span className={styles.infoLeftTxt}>{carBaseData && carBaseData.brand ? carBaseData.brand : ''}</span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Card>
                    </div>
                    <div className={styles.infoCenter}>
                        <Circle
                            imgSrcs={[house01, person01, car01, info01]}
                            imgClick={this.imgClick}
                            selectedKey={this.state.circleIndex}
                        />
                    </div>
                    <div className={`${styles.infoRight}`}>
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
                        <span style={{ color: '#0F8BB7' }}>{carInfoData.address} </span>
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
