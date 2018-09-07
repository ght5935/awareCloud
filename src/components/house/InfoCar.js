import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Select } from 'antd';

import Card from '../../components/common/Card';
import UnreglarTitle from '../../components/common/UnreglarTitle';
import * as Utils from '../../utils/utils';

import style from '../../style/common/common.css';
import styles from '../../pages/house/index.css';
import w from '../../assets/w.jpg';
const Option = Select.Option;
class InfoCar extends React.Component {
    componentDidMount() {

    }
    render() {
        const houseInfo = this.props.house.houseInfo;
        const houseInfoData = houseInfo.houseInfoData;
        const carList = houseInfoData.carList ? houseInfoData.carList : [];
        return (
            <Card titleLeft={carList && carList.length > 0 ? carList[0].plate : '车牌'}>
                <Row gutter={10} className={styles.middleRow}>
                    <Col span={24}>
                        <div className={styles.infoLeftBg} >
                            <img src={carList && carList.length > 0 ? carList[0].carImg : ''} />
                        </div>
                    </Col>
                </Row>
                <Row gutter={10} className={styles.middleRow}>
                    <Col span={24}>
                        <div className={styles.infoLeftCon}>
                            {
                                carList.map((item, idx) => {
                                    let Ele;
                                    if (item.perceptionTime) {
                                        Ele = (
                                            <div>
                                                <div style={{ marginBottom: 10 }}>
                                                    <UnreglarTitle
                                                        title={item.inOut ? item.inOut : '未知'}
                                                    />
                                                </div>
                                                <div className={styles.infoLeftBg}>
                                                    <span className={styles.infoLeftLabel}> 时间 </span>
                                                    <span className={styles.infoLeftTxt}> {Utils.timestampToTime(item.perceptionTime / 1000)}</span>
                                                </div>
                                                <div className={styles.infoLeftBg}>
                                                    <span className={styles.infoLeftLabel}> 关卡 </span>
                                                    <span className={styles.infoLeftTxt}> {item.perceptionAddress}</span>
                                                </div>
                                            </div>
                                        )
                                    }
                                    return Ele
                                }
                                )
                            }
                            {/* <Link to='/house/chart'>
                                <div className={styles.infoBtn}>轨迹查看</div>
                            </Link> */}
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