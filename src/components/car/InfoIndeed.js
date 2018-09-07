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
class InfoIndeed extends React.Component {
    componentDidMount() {

    }
    render() {
        const car = this.props.car
        const carInfo = car.carInfo
        const carInfoData = carInfo.carInfoData
        const insuranceList = carInfoData.insuranceList
        return (
            <Card titleLeft={'现有信息'}>
                <Row gutter={10} className={styles.middleRow}>
                    <Col span={24}>
                        <div className={styles.infoLeftBg} >
                            <img src={carInfoData && carInfoData.carOwnerData && carInfoData.carOwnerData.licenseImg ? carInfoData.carOwnerData.licenseImg : ''} />
                        </div>
                    </Col>
                </Row>
                {
                    insuranceList && insuranceList.insurance_company ?
                        <Row gutter={10} className={styles.middleRow}>
                            <Col span={24}>
                                <div className={styles.infoLeftCon}>
                                    <div style={{ marginBottom: 10 }}>
                                        <UnreglarTitle
                                            title={"车辆保险"}
                                        />
                                    </div>
                                    <div className={styles.infoLeftBg}>
                                        <span className={styles.infoLeftLabel}> 车主 </span>
                                        <span className={styles.infoLeftTxt}>{carInfoData && carInfoData.carOwnerData && carInfoData.carOwnerData.name ? carInfoData.carOwnerData.name : ''}</span>
                                    </div>
                                    <div className={styles.infoLeftBg}>
                                        <span className={styles.infoLeftLabel}> 保险公司 </span>
                                        <span className={styles.infoLeftTxt}>{insuranceList && insuranceList.insurance_company ? insuranceList.insurance_company : ''} </span>
                                    </div>
                                    <div className={styles.infoLeftBg}>
                                        <span className={styles.infoLeftLabel}> 保险单号 </span>
                                        <span className={styles.infoLeftTxt}> {insuranceList && insuranceList.insurance_code ? insuranceList.insurance_code : ''} </span>
                                    </div>
                                    <div className={styles.infoLeftBg}>
                                        <span className={styles.infoLeftLabel}> 保险期限 </span>
                                        <span className={styles.infoLeftTxt}>
                                            {insuranceList && insuranceList.insurance_starttime ? `自${Utils.timestampToTime(insuranceList.insurance_starttime / 1000)}起至${Utils.timestampToTime(insuranceList.insurance_endtime / 1000)}止` : ''}
                                        </span>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        : ''
                }

            </Card>
        )
    }
}

export default connect((state, action) => {
    return { ...state, ...action }
})(InfoIndeed);