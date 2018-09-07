import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';

import Card from '../../components/common/Card';
import UnreglarTitle from '../../components/common/UnreglarTitle';
import InfoiconCard from '../../components/common/InfoiconCard';

import styles from '../../pages/people/index.css';
import smPhoneIcon from '../../assets/home/phone-icon.png';

class InfoPersonId extends React.Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'people/getPersonDetailById',
            payload: {
                id: this.props.personId
            }
        })
    }
    render() {
        const data = this.props.people.personDetail;
        return (
            <Card titleLeft={'人员信息'}>
                <div className={styles.infoRightContainer}>
                    <div style={{ marginBottom: 10 }}>
                        <UnreglarTitle
                            title={"照片信息"}
                        />
                    </div>
                    <Row gutter={10} className={styles.middleRow}>
                        <Col span={24}>
                            <div className={styles.infoLeftBg} >
                                <img src={data.img && data.img.length > 0 ? data.img[0] : '' } alt="" style={{ width: 115, height: 154 }} />
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
                                titCon={data.name ? data.name : ''}
                                iSarrow={false}
                            />
                        </Col>
                        <Col span={12}>
                            <InfoiconCard
                                icons={smPhoneIcon}
                                titLabel={'性别'}
                                titCon={data.gender ? data.gender : ''}
                                iSarrow={false}
                            />
                        </Col>
                    </Row>
                    <Row className={styles.middleRow} gutter={10}>
                        <Col span={12}>
                            <InfoiconCard
                                icons={smPhoneIcon}
                                titLabel={'民族'}
                                titCon={data.nation ? data.nation : '无'}
                                iSarrow={false}
                            />
                        </Col>
                        <Col span={12}>
                            <InfoiconCard
                                icons={smPhoneIcon}
                                titLabel={'婚姻状况'}
                                titCon={data.maritalStatus ? data.maritalStatus : ''}
                                iSarrow={false}
                            />
                        </Col>
                    </Row>
                    <Row className={styles.middleRow} gutter={10}>
                        <Col span={12}>
                            <InfoiconCard
                                icons={smPhoneIcon}
                                titLabel={'电话'}
                                titCon={data.phone ? data.phone : ''}
                                iSarrow={false}
                            />
                        </Col>
                        <Col span={12}>
                            <InfoiconCard
                                icons={smPhoneIcon}
                                titLabel={'人物标签'}
                                titCon={data.tag ? data.tag : ''}
                                iSarrow={false}
                            />
                        </Col>
                    </Row>
                    <Row gutter={10} className={styles.middleRow}>
                        <Col span={24}>
                            <InfoiconCard
                                icons={smPhoneIcon}
                                titLabel={'身份证号'}
                                titCon={data.identityCard ? data.identityCard : ''}
                                iSarrow={false}
                            />
                        </Col>
                    </Row>
                    <Row gutter={10} className={styles.middleRow}>
                        <Col span={24}>
                            <InfoiconCard
                                icons={smPhoneIcon}
                                titLabel={'住址'}
                                titCon={data.address ? data.address : ''}
                                iSarrow={false}
                            />
                        </Col>
                    </Row>
                </div>
            </Card>
        )
    }
}

export default connect((state) => {
    return { ...state }
})(InfoPersonId);

