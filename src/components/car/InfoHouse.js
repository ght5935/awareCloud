import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Select } from 'antd';

import Card from '../../components/common/Card';
import UnreglarTitle from '../../components/common/UnreglarTitle';

import style from '../../style/common/common.css';
import styles from '../../pages/house/index.css';
const Option = Select.Option;
class InfoHouse extends React.Component {
    componentDidMount() {

    }
    render() {
        const car = this.props.car
        const carInfo = car.carInfo
        const carInfoData = carInfo.carInfoData
        const carHouseData = carInfoData.carHouseData
        return (
            <Card titleLeft={carHouseData ? carHouseData.address : ''}>
                <Row gutter={10} className={styles.middleRow}>
                    <Col span={24}>
                        <div className={styles.infoLeftBg} >
                            <img src={carHouseData && carHouseData.houseImg ? carHouseData.houseImg : ''} />
                        </div>
                    </Col>
                </Row>
                <Row gutter={10} className={styles.middleRow}>
                    <Col span={24}>
                        <div className={styles.infoLeftCon}>
                            <div style={{ marginBottom: 10 }}>
                                <UnreglarTitle
                                    title={"房屋信息"}
                                />
                            </div>
                            <div className={styles.infoLeftBg}>
                                <span className={styles.infoLeftLabel}> 房屋类型 </span>
                                <span className={styles.infoLeftTxt}> {carHouseData && carHouseData.type ? carHouseData.type : ''} </span>
                            </div>
                            <div className={styles.infoLeftBg}>
                                <span className={styles.infoLeftLabel}> 房屋属性 </span>
                                <span className={styles.infoLeftTxt}>  {carHouseData && carHouseData.attribute ? carHouseData.attribute : ''} </span>
                            </div>
                            <div className={styles.infoLeftBg}>
                                <span className={styles.infoLeftLabel}> 房屋面积 </span>
                                <span className={styles.infoLeftTxt}>  {carHouseData && carHouseData.area ? `${carHouseData.area}平方米` : ''}  </span>
                            </div>
                            {/* <div className={styles.infoLeftBg}>
                                <span className={styles.infoLeftLabel}> 户主关系 </span>
                                <span className={styles.infoLeftTxt}> 租户 </span>
                            </div> */}
                            <Link to={`/house/info?houseId=${carHouseData ? carHouseData.houseId : ''}`}>
                                <div className={styles.infoBtn}>一屋一档</div>
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default connect((state, action) => {
    return { ...state, ...action }
})(InfoHouse);