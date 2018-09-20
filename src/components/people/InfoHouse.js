import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Select } from 'antd';

import Card from '../../components/common/Card';
import UnreglarTitle from '../../components/common/UnreglarTitle';

import style from '../../style/common/common.css';
import styles from './index.css';
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
        this.props.dispatch({
            type: 'people/getHouseInfoByPersonId'
        });
    }
    onSelectDate = (value) => {
        this.props.dispatch({
            type: 'people/success',
            payload: {
                utilitiesParams: value
            }
        });
        this.props.dispatch({
            type: 'people/getUtilities'
        })
    }

    render() {
        const data = this.props.people.houseInfo && this.props.people.houseInfo.length > 0 ? this.props.people.houseInfo[0] : [];
        return (
            <Card
                titleLeft={data && data.address ? data.address : ''}
            >
                <Row gutter={10} >
                    <Col span={24}>
                        <div className={styles.infoLeftBg} >
                            {
                                data && data.houseImg && data.houseImg.length > 0 ?
                                    <img alt="" src={data.houseImg[0]} />
                                    : <div className={styles.noDom}> 无图片信息 </div>
                            }
                        </div>
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col span={24}>
                        <div className={styles.infoLeftCon}>
                            <div style={{ marginBottom: 10 }}>
                                <UnreglarTitle
                                    title={"房屋信息"}
                                />
                            </div>
                            <div className={styles.infoLeftBg}>
                                <span className={styles.infoLeftLabel}> 房屋类型 </span>
                                <span className={styles.infoLeftTxt}> {data && data.houseRelation ? data.houseRelation : ''} </span>
                            </div>
                            <div className={styles.infoLeftBg}>
                                <span className={styles.infoLeftLabel}> 房屋属性 </span>
                                <span className={styles.infoLeftTxt}> {data && data.attribute ? data.attribute : ''} </span>
                            </div>
                            <div className={styles.infoLeftBg}>
                                <span className={styles.infoLeftLabel}> 房屋面积 </span>
                                <span className={styles.infoLeftTxt}>{`${data && data.area ? data.area : 0}平方米`}</span>
                            </div>

                            <div style={{ marginBottom: 10 }}>
                                <UnreglarTitle
                                    title={"水电煤"}
                                />
                            </div>
                            <div className={styles.infoLeftBg}>
                                <span className={styles.infoLeftLabel}> 水 </span>
                                <span className={styles.infoLeftTxt}>
                                    {this.props.people.utilityData && this.props.people.utilityData.waterConsumption ?
                                        `${this.props.people.utilityData.waterConsumption}(立方米)` : 0}
                                </span>
                            </div>
                            <div className={styles.infoLeftBg}>
                                <span className={styles.infoLeftLabel}> 电 </span>
                                <span className={styles.infoLeftTxt}>
                                    {this.props.people.utilityData && this.props.people.utilityData.electricConsumption ?
                                        `${this.props.people.utilityData.electricConsumption}(千瓦时)` : 0}
                                </span>
                            </div>
                            <div className={styles.infoLeftBg}>
                                <span className={styles.infoLeftLabel}> 煤 </span>
                                <span className={styles.infoLeftTxt}>
                                    {this.props.people.utilityData && this.props.people.utilityData.gasConsumption ?
                                        `${this.props.people.utilityData.gasConsumption}(立方米)` : 0}
                                </span>
                            </div>
                            <div className={styles.infoLeftTime}>
                                <Select
                                    style={{ width: '100%' }}
                                    onChange={this.onSelectDate}
                                    placeholder={'选择日期'}
                                    value={this.props.people.utilitiesParams}
                                >
                                    {this.props.people.UtilitiesDateList && this.props.people.UtilitiesDateList.length > 0 ?
                                        this.props.people.UtilitiesDateList.map((value, i) =>
                                            <Option
                                                key={i}
                                                value={`${value.month}`}>{value.month}</Option>
                                        ) : null}
                                </Select>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to={`/house/info?houseId=${data.houseId}`}>
                            <div className={styles.infoBtn}>一屋一档</div>
                        </Link>
                    </Col>
                </Row>
            </Card>
        )
    }
}

export default connect((state) => {
    return { ...state }
})(InfoCar);

