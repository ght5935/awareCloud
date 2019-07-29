import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Select, Modal } from 'antd';

import CardTitle from '../../components/common/CardTitle';

import * as Utils from '../../utils/utils';

import style from '../../style/common/common.css';
import styles from './index.css';
import w from '../../assets/w.jpg';
const Option = Select.Option;
class DetailCar extends React.Component {
    componentDidMount() {

    }
    onCancel = () => {
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                detailVisible: false,
            }
        })
    }
    onTrackClick = () => {
        this.props.dispatch({
            type: 'awareCar/success',
            payload: {
                detailVisible: false,
                trackVisible: true,
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
                <CardTitle titleCenter={'车辆详情'} className={styles.blackBg}>
                    <div className={styles.cardTitle}>
                        <div className={styles.titleLeft}>抓拍信息</div>
                        <div className={styles.titleRight}></div>
                    </div>
                    <div className={styles.cardBg}>
                        <Row>
                            <Col span={16}>
                                <dl className={styles.carList}>
                                    <dt><img alt='' src={modelData.img} style={{ width: 182, maxHeight:182 }} /></dt>
                                    <dd>车&nbsp;&nbsp;&nbsp;牌: {modelData.plate}</dd>
                                    <dd>车&nbsp;&nbsp;&nbsp;型: {modelData.model}</dd>
                                    <dd>标&nbsp;&nbsp;&nbsp;签: {modelData.plateType}</dd>
                                    <dd>颜&nbsp;&nbsp;&nbsp;色: {modelData.color}</dd>
                                    <dd>车&nbsp;&nbsp;&nbsp;系: {modelData.carSystem}</dd>
                                    <dd>品&nbsp;&nbsp;&nbsp;牌: {modelData.brand}</dd>
                                    <dd>姓&nbsp;&nbsp;&nbsp;名: {modelData.poiName}</dd>
                                    <dd>身份证: {modelData.identityCard}</dd>
                                </dl>
                            </Col>
                            <Col span={8} >
                                <div className={styles.btn} style={{ marginTop: 130 }} onClick={this.onTrackClick}>轨迹查看</div>
                            </Col>
                        </Row>
                        <Row>
                            <div className={styles.titleInfo}>
                                <Col span={8}>
                                    <span style={{ color: '#0F8BB7' }}>{modelData.camera}</span>
                                </Col>
                                <Col span={8}>
                                    <span>{modelData.captureTime}</span>
                                </Col>
                            </div>
                        </Row>
                        <Row>
                            <div className={styles.detailImg}>
                                <Col span={15}>
                                    <img alt='' src={modelData.siteImg} className={styles.slImg} />
                                </Col>
                                <Col span={9}>
                                    {modelData.carImgs && modelData.carImgs.length > 0 ?
                                        modelData.carImgs.map((v, i) => <img alt='' src={v} className={styles.smImg} key={i}/>)
                                        : ''}
                                </Col>
                            </div>
                        </Row>
                    </div>
                </CardTitle>
            </Modal>
        )
    }
}

export default connect((state, action) => {
    return { ...state, ...action }
})(DetailCar);