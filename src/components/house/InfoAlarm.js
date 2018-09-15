import React from 'react';
import { connect } from 'dva';
import { Row, Col, Select } from 'antd';

import Card from '../../components/common/Card';

import * as Utils from '../../utils/utils';

import style from '../../style/common/common.css';
import styles from '../../pages/house/index.css';

class InfoAlarm extends React.Component {
    componentDidMount() {

    }
    render() {
        const houseInfo = this.props.house.houseInfo;
        const houseInfoData = houseInfo.houseInfoData;
        const perceiveList = houseInfoData.perceiveList ? houseInfoData.perceiveList : []
        return (
            <Card titleLeft={'警情信息'}>
                {
                    perceiveList.length > 0 ? perceiveList.map((item, idx) => (
                        <Row gutter={10} className={styles.middleRow} key={idx}>
                            <Col span={24}>
                                <div className={styles.infoLeftCon}>
                                    <div className={styles.infoLeftBg}>
                                        <span className={styles.infoLeftLabel}> 感知事件 </span>
                                        <span className={styles.infoLeftTxt} style={{ color: "#9A4444 " }}> {item.msg} </span>
                                    </div>
                                    <div className={styles.infoLeftBg}>
                                        <span className={styles.infoLeftLabel}> 感知时间 </span>
                                        <span className={styles.infoLeftTxt}> {Utils.timestampToTime(item.perceptionTime / 1000)} </span>
                                    </div>
                                    <div className={styles.infoLeftBg}>
                                        <span className={styles.infoLeftLabel}> 处理时间 </span>
                                        <span className={styles.infoLeftTxt}> {Utils.timestampToTime(item.handleTime / 1000)} </span>
                                    </div>
                                    <div className={styles.infoLeftBg}>
                                        <span className={styles.infoLeftLabel}> 处理方式 </span>
                                        <span className={styles.infoLeftTxt}> {item.handleWay} </span>
                                    </div>
                                    <div className={styles.infoLeftBg}>
                                        <span className={styles.infoLeftLabel}> 处理结果 </span>
                                        <span className={styles.infoLeftTxt} style={{ color: "#3D938D" }}>
                                            {item.process == 0 ? '已处理' : '未处理'}
                                        </span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    )) : <div className={styles.noDom}> 无信息 </div>
                }
            </Card>
        )
    }
}

export default connect((state, action) => {
    return { ...state, ...action }
})(InfoAlarm);