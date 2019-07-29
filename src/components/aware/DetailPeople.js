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
class DetailPeople extends React.Component {
    componentDidMount() {

    }
    onCancel = () => {
        this.props.dispatch({
            type: 'awarePeople/success',
            payload: {
                detailVisible: false,
            }
        })
    }
    onTrackClick = () => {
        this.props.dispatch({
            type: 'awarePeople/success',
            payload: {
                detailVisible: false,
                trackVisible: true,
            }
        })
    }
    renderTarget = (data) => {

        return data.map((v, i) => (
            <dl className={styles.targetPeople} onClick={this.onTrackClick} key={i}>
                <dt><img src={w} /></dt>
                <dd>姓&nbsp;&nbsp;&nbsp;名: 王小明</dd>
                <dd>身份证: 888888888888888888</dd>
                <dd>相似度: 56.12%</dd>
                <dd>标&nbsp;&nbsp;&nbsp;签: 本地</dd>
            </dl>
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
                <CardTitle titleCenter={'抓拍详情'} className={styles.blackBg}>
                    <Row>
                        <Col span={12}>
                            <div className={styles.cardTitle}>
                                <div className={styles.titleLeft}>抓拍信息</div>
                                <div className={styles.titleRight}></div>
                            </div>
                            <div className={styles.cardBg}>
                                <div className={styles.smImgBox}>
                                    {this.props.dataSource && this.props.dataSource.ftImgs && this.props.dataSource.ftImgs.length > 0 ?
                                        this.props.dataSource.ftImgs.map(v => <img className={styles.smImg_p} alt="" src={v} />) :
                                        ''
                                    }

                                </div>
                                <div className={styles.Info_p}>
                                    <span style={{ color: '#0F8BB7' }}>{this.props.dataSource && this.props.dataSource.camera ? this.props.dataSource.camera : ''}</span>
                                    <span style={{ color: '#fff' }}>{this.props.dataSource && this.props.dataSource.captureTime ? this.props.dataSource.captureTime : ''}</span>
                                </div>
                                <div className={styles.sxImgBox}>
                                    <img
                                        className={styles.sxImg_p}
                                        src={this.props.dataSource && this.props.dataSource.siteImg ?
                                            this.props.dataSource.siteImg : ''}
                                        alt=""
                                    />
                                </div>
                            </div>
                        </Col>
                        <Col span={1} style={{ width: '1%' }}></Col>
                        <Col span={11} style={{ width: '49%' }}>
                            <div className={styles.cardTitle}>
                                <div className={styles.titleLeft}>目标信息</div>
                                <div className={styles.titleRight}></div>
                            </div>
                            <div className={styles.cardBg}>

                                <div className={`${styles.peopleDetail} ${style.scrollbar}`}>
                                    {this.renderTarget([])}
                                </div>
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
})(DetailPeople);