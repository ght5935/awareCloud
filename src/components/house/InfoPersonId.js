import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col } from 'antd';

import Card from '../../components/common/Card';
import UnreglarTitle from '../../components/common/UnreglarTitle';
import InfoiconCard from '../../components/common/InfoiconCard';

import smPhoneIcon from '../../assets/home/phone-icon.png';

import styles from '../../pages/house/index.css';

import r from '../../assets/r.jpeg';

class InfoPersonId extends React.Component {
    componentDidMount() {


    }
    closeDetail = () => {
        const houseInfo = this.props.house.houseInfo;
        this.props.dispatch({
            type: 'house/success',
            payload: {
                houseInfo: {
                    ...houseInfo,
                    personDetail: false
                }
            }
        });
    }
    render() {
        const houseInfo = this.props.house.houseInfo;
        const houseInfoData = houseInfo.houseInfoData;
        const personList = houseInfoData.personList;
        return (
            <Card titleLeft={'人员信息'}>
                {
                    personList.map((v, i) => {
                        let Ele;
                        if (v.id == houseInfo.personDetailId) {
                            Ele = (
                                <div className={styles.infoRightContainer} key={i}>
                                    <div style={{ marginBottom: 10 }}>
                                        <UnreglarTitle
                                            title={"照片信息"}
                                        />
                                    </div>
                                    <div className={styles.infoRightBtn} onClick={this.closeDetail}>收起 ∧ </div>
                                    <Row gutter={10} className={styles.middleRow}>
                                        <Col span={24}>
                                            <div className={styles.infoLeftBg} >
                                                <img src={r} style={{ width: 115, height: 154 }} alt="" />
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
                                                titCon={v.name}
                                                iSarrow={false}
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <InfoiconCard
                                                icons={smPhoneIcon}
                                                titLabel={'性别'}
                                                titCon={v.gender}
                                                iSarrow={false}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className={styles.middleRow} gutter={10}>
                                        <Col span={12}>
                                            <InfoiconCard
                                                icons={smPhoneIcon}
                                                titLabel={'民族'}
                                                titCon={v.nation}
                                                iSarrow={false}
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <InfoiconCard
                                                icons={smPhoneIcon}
                                                titLabel={'婚姻状况'}
                                                titCon={v.maritalStatus}
                                                iSarrow={false}
                                            />
                                        </Col>
                                    </Row>
                                    <Row className={styles.middleRow} gutter={10}>
                                        <Col span={12}>
                                            <InfoiconCard
                                                icons={smPhoneIcon}
                                                titLabel={'电话'}
                                                titCon={v.phone}
                                                iSarrow={false}
                                            />
                                        </Col>
                                        <Col span={12}>
                                            <InfoiconCard
                                                icons={smPhoneIcon}
                                                titLabel={'人物标签'}
                                                titCon={v.houseRelation}
                                                iSarrow={false}
                                            />
                                        </Col>
                                    </Row>
                                    <Row gutter={10} className={styles.middleRow}>
                                        <Col span={24}>
                                            <InfoiconCard
                                                icons={smPhoneIcon}
                                                titLabel={'身份证号'}
                                                titCon={v.identityCard}
                                                iSarrow={false}
                                            />
                                        </Col>
                                    </Row>
                                    <Row gutter={10} className={styles.middleRow}>
                                        <Link to={`/people/info?personId=${houseInfo.personDetailId}`}>
                                            <div className={styles.infoBtn}>一人一档</div>
                                        </Link>
                                    </Row>
                                </div>
                            )
                        }
                        return Ele;
                    })
                }

            </Card>
        )
    }
}

export default connect((state, action) => {
    return { ...state, ...action }
})(InfoPersonId);