import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Select, Modal } from 'antd';

import CardTitle from '../../components/common/CardTitle';
import UnreglarTitle from '../../components/common/UnreglarTitle';
import * as Utils from '../../utils/utils';

import style from '../../style/common/common.css';
import styles from './index.css';
const Option = Select.Option;
class TrackCar extends React.Component {
    componentDidMount() {

    }
    onCancel = () => {
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                trackVisible: false,
            }
        })
    }
    onTrackClick = () => {
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                trackVisible: false,
            }
        })
    }
    render() {
        const modelData = this.props.awareCar.modelData
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
                <CardTitle titleCenter={'车辆轨迹'} className={styles.blackBg}>
                    <Row>
                        <Col span={12}>
                            <div className={styles.cardTitle} style={{ marginBottom: 10 }}>
                                <div className={styles.titleLeft}>{modelData.plate}</div>
                                <div className={styles.titleRight}></div>
                            </div>
                            <div className={styles.infoLeftBg}>
                                {
                                    modelData && modelData.img ?
                                        <img src={modelData.img} className={styles.trackCarImg} />
                                        : <div className={styles.noDom}> 无图片信息 </div>
                                }
                            </div>
                            <div className={styles.infoLeftCon}>
                                <div style={{ marginBottom: 10 }}>
                                    <UnreglarTitle
                                        title={"车辆信息"}
                                    />
                                </div>
                                <div className={styles.infoLeftBg}>
                                    <span className={styles.infoLeftLabel}> 车牌 </span>
                                    <span className={styles.infoLeftTxt}> {modelData.plate} </span>
                                </div>
                                <div className={styles.infoLeftBg}>
                                    <span className={styles.infoLeftLabel}> 颜色 </span>
                                    <span className={styles.infoLeftTxt}> {modelData.color} </span>
                                </div>
                                <div className={styles.infoLeftBg}>
                                    <span className={styles.infoLeftLabel}> 车型 </span>
                                    <span className={styles.infoLeftTxt}>{modelData.model} </span>
                                </div>
                                <div className={styles.infoLeftBg}>
                                    <span className={styles.infoLeftLabel}> 车系 </span>
                                    <span className={styles.infoLeftTxt}>{modelData.carSystem} </span>
                                </div>
                                <div className={styles.infoLeftBg}>
                                    <span className={styles.infoLeftLabel}> 品牌 </span>
                                    <span className={styles.infoLeftTxt}>{modelData.brand}</span>
                                </div>
                                <div className={styles.infoLeftBg}>
                                    <span className={styles.infoLeftLabel}> 所属 </span>
                                    <span className={styles.infoLeftTxt}>
                                        {modelData.poiName}{modelData.phone ? `/${modelData.phone}` : ''}
                                    </span>
                                </div>
                            </div>
                        </Col>
                        <Col span={12}>
                            <div className={styles.cardTitle}>
                                <div className={styles.titleLeft}>感知信息</div>
                                <div className={styles.titleRight}></div>
                            </div>
                            <div className={`${styles.awareCar} ${style.scrollbar}`}>
                                {
                                    modelData && modelData.preceiveDataList && modelData.preceiveDataList.length > 0 ?
                                        modelData.preceiveDataList.map((v, i) => (
                                            <div className={styles.awareInfo}>
                                                <div className={styles.awareTxt}>时间: {v.captrueTime}</div>
                                                <div className={styles.awareTxt}>设备: {v.device}</div>
                                            </div>
                                        )):''
                                }
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
})(TrackCar);