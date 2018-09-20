import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Select } from 'antd';

import Card from '../../components/common/CardTabs';
import UnreglarTitle from '../../components/common/UnreglarTitle';
import * as Utils from '../../utils/utils';

import style from '../../style/common/common.css';
import styles from '../../pages/house/index.css';
import w from '../../assets/w.jpg';
const Option = Select.Option;
class InfoCar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            infoCarIndex: 0
        }

    }
    componentDidMount() {

    }
    onTabClick = (v) => {
        const houseInfo = this.props.house.houseInfo;
        const houseInfoData = houseInfo.houseInfoData;
        const carList = houseInfoData.carList && houseInfoData.carList.length > 0 ? houseInfoData.carList : [];
        if (carList && carList.length == 1) {
            v = 0
        }
        this.setState({
            infoCarIndex: v
        })
    }
    render() {
        const houseInfo = this.props.house.houseInfo;
        const houseInfoData = houseInfo.houseInfoData;
        const carList = houseInfoData.carList && houseInfoData.carList.length > 0 ? houseInfoData.carList : [];
        return (
            <Card
                titleLeft={carList && carList.length > 0 && carList[0].plate ? `${carList[0].plate}` : '无'}
                titleRight={carList && carList.length > 1 && carList[1].plate ? `${carList[1].plate}` : ''}
                onTabClick={this.onTabClick}
                tabIndex={this.state.infoCarIndex}
            >
                {
                    carList.length > 0 ?
                        <Row gutter={10} >
                            <Col span={24}>
                                <div className={styles.infoLeftBg} >
                                    <img
                                        src={carList && carList.length > 0 ? carList[0].carImg : ''}
                                    />
                                    <Link to={carList && carList.length > 0 && carList[0].carDetailData ? `/car/info?carId=${carList[this.state.infoCarIndex].id}` : ''}>
                                        <div className={styles.infoBtn}>一车一档</div>
                                    </Link>
                                </div>
                            </Col>
                        </Row>
                        : <div className={styles.noDom}> 无图片信息 </div>
                }
                {/* <Row gutter={10} >
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
                        </div>
                    </Col>
                </Row> */}
            </Card>
        )
    }
}

export default connect((state, action) => {
    return { ...state, ...action }
})(InfoCar);