import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col } from 'antd';

import Card from '../../components/common/Card';
import UnreglarTitle from '../../components/common/UnreglarTitle';
import InfoiconCard from '../../components/common/InfoiconCard';

import smPhoneIcon from '../../assets/home/phone-icon.png';

import style from '../../style/common/common.css';
import styles from '../../pages/car/index.css';

import r from '../../assets/r.jpeg';

class InfoPerson extends React.Component {
    componentDidMount() {


    }
    closeDetail = () => {
        const houseInfo = this.props.house.houseInfo;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                houseInfo: {
                    ...houseInfo,
                    personDetail: false
                }
            }
        });
    }
    render() {
        const car = this.props.car
        const carInfo = car.carInfo
        const carInfoData = carInfo.carInfoData
        const carOwnerData = carInfoData.carOwnerData
        return (
            <Card titleLeft={'人员信息'}>
                <div className={`${styles.infoRightContainer} ${style.scrollbar}`} key={'i'}>
                    <div style={{ marginBottom: 10 }}>
                        <UnreglarTitle
                            title={"照片信息"}
                        />
                    </div>
                    <Row gutter={10} className={styles.middleRow}>
                        <Col span={24}>
                            <div className={styles.infoLeftBg} >
                                <img
                                    src={carOwnerData && carOwnerData.personImg ? carOwnerData.personImg : ''}
                                    // style={{ width: 115, height: 154 }}
                                    alt=""
                                />
                            </div>
                        </Col>
                    </Row>
                    <div style={{ marginBottom: 10 }}>
                        <UnreglarTitle
                            title={"详细信息"}
                        />
                    </div>
                    <Row className={styles.middleRow} gutter={10}>
                        <Col span={12}>
                            <InfoiconCard
                                icons={smPhoneIcon}
                                titLabel={'姓名'}
                                titCon={carOwnerData && carOwnerData.name ? carOwnerData.name : ''}
                                iSarrow={false}
                            />
                        </Col>
                        <Col span={12}>
                            <InfoiconCard
                                icons={smPhoneIcon}
                                titLabel={'性别'}
                                titCon={carOwnerData && carOwnerData.gender ? carOwnerData.gender : ''}
                                iSarrow={false}
                            />
                        </Col>
                    </Row>
                    <Row className={styles.middleRow} gutter={10}>
                        <Col span={12}>
                            <InfoiconCard
                                icons={smPhoneIcon}
                                titLabel={'民族'}
                                titCon={carOwnerData && carOwnerData.nation ? carOwnerData.nation : ''}
                                iSarrow={false}
                            />
                        </Col>
                        <Col span={12}>
                            <InfoiconCard
                                icons={smPhoneIcon}
                                titLabel={'婚姻状况'}
                                titCon={carOwnerData && carOwnerData.maritalStatus ? carOwnerData.maritalStatus : ''}
                                iSarrow={false}
                            />
                        </Col>
                    </Row>
                    <Row className={styles.middleRow} gutter={10}>
                        <Col span={12}>
                            <InfoiconCard
                                icons={smPhoneIcon}
                                titLabel={'电话'}
                                titCon={carOwnerData && carOwnerData.phone ? carOwnerData.phone : ''}
                                iSarrow={false}
                            />
                        </Col>
                        <Col span={12}>
                            <InfoiconCard
                                icons={smPhoneIcon}
                                titLabel={'人物标签'}
                                titCon={carOwnerData && carOwnerData.tag ? carOwnerData.tag : ''}
                                iSarrow={false}
                            />
                        </Col>
                    </Row>
                    <Row className={styles.middleRow}>
                        <Col span={24} >
                            <InfoiconCard
                                icons={smPhoneIcon}
                                titLabel={'身份证号'}
                                titCon={carOwnerData && carOwnerData.identityCard ? carOwnerData.identityCard : ''}
                                iSarrow={false}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Link to={`/people/info?personId=${carOwnerData ? carOwnerData.id : ''}`}>
                            <div className={styles.infoBtn}>一人一档</div>
                        </Link>
                    </Row>
                </div>
            </Card>
        )
    }
}

export default connect((state, action) => {
    return { ...state, ...action }
})(InfoPerson);