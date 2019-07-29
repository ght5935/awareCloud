import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Select, Modal } from 'antd';

import CardTitle from '../../components/common/CardTitle';
import UnreglarTitle from '../../components/common/UnreglarTitle';
import InfoiconCard from '../../components/common/InfoiconCard';
import * as Utils from '../../utils/utils';
import smPhoneIcon from '../../assets/home/phone-icon.png';

import style from '../../style/common/common.css';
import styles from './index.css';
import w from '../../assets/w.jpg';
const Option = Select.Option;
class TrackPeople extends React.Component {
    componentDidMount() {

    }
    onCancel = () => {
        this.props.dispatch({
            type: 'awarePeople/success',
            payload: {
                trackVisible: false,
            }
        })
    }
    onTrackClick = () => {
        this.props.dispatch({
            type: 'awarePeople/success',
            payload: {
                trackVisible: false,
            }
        })
    }
    renderAwarePeople = (data) => {

        return data.map((v, i) => (
            <div className={styles.awareInfo} key={i}>
                <div className={styles.awareTxt}> 时间: 8888-88-88 88:88:88</div>
                <div className={styles.awareTxt}> 设备: 心园东苑南门</div>
            </div>
        ))
    }
    render() {
        return (
            <Modal
                visible={this.props.visible}
                footer={null}
                closable={false}
                centered
                onCancel={this.props.onCancel}
                width={this.props.width}
            >
                <span className={styles.close} onClick={this.onCancel}> × </span>
                <CardTitle titleCenter={'人员轨迹'} className={styles.blackBg}>
                    <Row>
                        <Col span={12}>
                        <div className={styles.cardTitle}>
                                <div className={styles.titleLeft}>人员信息</div>
                                <div className={styles.titleRight}></div>
                            </div>
                            <div className={styles.infoLeftBg}>
                                <div style={{ marginBottom: 10 }}>
                                    <UnreglarTitle
                                        title={"照片信息"}
                                    />
                                </div>
                                {
                                    1 && 1.1 ?
                                        <img src={w} className={styles.trackPeopleImg} />
                                        : <div className={styles.noDom}> 无图片信息 </div>
                                }
                            </div>
                            <div className={styles.infoLeftCon}>
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
                                            titCon={'王小明'}
                                            iSarrow={false}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <InfoiconCard
                                            icons={smPhoneIcon}
                                            titLabel={'性别'}
                                            titCon={'男'}
                                            iSarrow={false}
                                        />
                                    </Col>
                                </Row>
                                <Row className={styles.middleRow} gutter={10}>
                                    <Col span={12}>
                                        <InfoiconCard
                                            icons={smPhoneIcon}
                                            titLabel={'民族'}
                                            titCon={'汗'}
                                            iSarrow={false}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <InfoiconCard
                                            icons={smPhoneIcon}
                                            titLabel={'婚姻状况'}
                                            titCon={'已婚'}
                                            iSarrow={false}
                                        />
                                    </Col>
                                </Row>
                                <Row className={styles.middleRow} gutter={10}>
                                    <Col span={12}>
                                        <InfoiconCard
                                            icons={smPhoneIcon}
                                            titLabel={'电话'}
                                            titCon={'11'}
                                            iSarrow={false}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <InfoiconCard
                                            icons={smPhoneIcon}
                                            titLabel={'人物标签'}
                                            titCon={'哈哈对象'}
                                            iSarrow={false}
                                        />
                                    </Col>
                                </Row>
                                <Row className={styles.middleRow} gutter={10}>
                                    <Col span={24}>
                                        <InfoiconCard
                                            icons={smPhoneIcon}
                                            titLabel={'身份证号'}
                                            titCon={'11'}
                                            iSarrow={false}
                                        />
                                    </Col>
                                </Row>
                                <Row className={styles.middleRow} gutter={10}>
                                    <Col span={24}>
                                        <InfoiconCard
                                            icons={smPhoneIcon}
                                            titLabel={'住址'}
                                            titCon={'11'}
                                            iSarrow={false}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col span={1} style={{ width: '1%' }}></Col>
                        <Col span={11} style={{ width: '49%' }}>
                            <div className={styles.cardTitle}>
                                <div className={styles.titleLeft}>感知信息</div>
                                <div className={styles.titleRight}></div>
                            </div>
                            <div className={`${styles.awarePeople} ${style.scrollbar}`}>
                                {this.renderAwarePeople([1,1])}
                                <div className={styles.btnTrack} onClick={this.onTrackClick}>全部轨迹</div>
                            </div>
                        </Col>
                    </Row>
                </CardTitle>
            </Modal>
        )
    }
}

export default connect((state, action) => {
    return { ...state, ...action }
})(TrackPeople);