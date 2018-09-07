

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

import InfoCar from '../../components/people/InfoCar';
import InfoHouse from '../../components/people/InfoHouse';
import InfoAccount from '../../components/people/InfoAccount';
import InfoIndeed from '../../components/people/InfoIndeed';
import InfoFacetrack from '../../components/people/InfoFacetrack';
import InfoPersonId from '../../components/people/InfoPersonId';


import styles from './index.css';
import * as Utils from '../../utils/utils';

import car from '../../assets/indeedEntry/personInfo/car.png';
import door from '../../assets/indeedEntry/personInfo/door.png';
import house from '../../assets/indeedEntry/personInfo/house.png';
import info from '../../assets/indeedEntry/personInfo/info.png';
import person_track from '../../assets/indeedEntry/personInfo/person_track.png';


class HouseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            circleIndex: 0,
            timestamp: Math.round(new Date() / 1000)
        }
    }
    componentDidMount() {
        let query = this.props.location.query;
        this.props.dispatch({
            type: 'people/success',
            payload: {
                personId: query.personId
            }
        })
    }
    imgClick = (key) => {
        this.setState({
            circleIndex: key
        })

    }
    renderCircle = (key) => {
        let Ele;
        switch (key) {
            case 0:
                Ele = <InfoCar personId={this.props.location.query.personId} />
                break;
            case 1:
                Ele = <InfoHouse />
                break;
            case 2:
                Ele = <InfoIndeed />
                break;
            case 3:
                Ele = <InfoAccount />
                break;
            case 4:
                Ele = <InfoFacetrack />
                break;
            default:
                Ele = <InfoCar personId={this.props.location.query.personId} />
                break;
        }
        return Ele
    }
    render() {
        const data = this.props.people.personDetail
        return (
            <div className={styles.info}>
                <div className={styles.infoTop}>
                    <Slogen type={0}>
                        <Row>
                            <Col span={24} className={styles.selectTop}>
                                <span className={styles.title}>实有人口</span>
                                <span className={styles.title} style={{ fontSize: 15 }}>-一人一档</span>
                            </Col>
                        </Row>
                    </Slogen>
                </div>
                <div className={styles.infoContent}>
                    <div className={styles.infoLeft}>
                        <InfoPersonId personId={this.props.location.query.personId} />
                    </div>
                    <div className={styles.infoCenter}>
                        <Circle
                            selectedKey={this.state.circleIndex}
                            imgSrcs={[car, house, info, door, person_track]}
                            imgClick={this.imgClick}
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
                        <span style={{ color: '#0F8BB7' }}>{data&&data.name ? data.name :'XXX'} </span>
                            的个人档案。</span>
                    </QueryCard>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return { ...state }
})(HouseInfo);

