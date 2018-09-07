import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Select } from 'antd';

import Card from '../../components/common/Card';
import UnreglarTitle from '../../components/common/UnreglarTitle';
import * as Utils from '../../utils/utils';

import style from '../../style/common/common.css';
import styles from '../../pages/house/index.css';
const Option = Select.Option;
class InfoCar extends React.Component {
    componentDidMount() {

    }
    render() {
        const car = this.props.car
        const carInfo = car.carInfo
        const carInfoData = carInfo.carInfoData
        const carPerceive = carInfoData && carInfoData.carPerceive ? carInfoData.carPerceive : []
        return (
            <Card titleLeft={'车辆轨迹'}>
                <Row gutter={10} className={styles.middleRow}>
                    <Col span={24}>
                        <div className={styles.infoLeftCon}>
                            {
                                carPerceive.map((item, idx) => (
                                    <div>
                                        <div style={{ marginBottom: 10 }}>
                                            <UnreglarTitle
                                                title={item.inOut == 1 ? '进去' : item.inOut == 2 ? '出去' : '未知'}
                                            />
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 时间 </span>
                                            <span className={styles.infoLeftTxt}> {Utils.timestampToTime(item.perceptionTime / 1000)}</span>
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 关卡 </span>
                                            <span className={styles.infoLeftTxt}> {item.name}</span>
                                        </div>
                                    </div>)
                                )
                            }
                        </div>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default connect((state, action) => {
    return { ...state, ...action }
})(InfoCar);