import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Row, Col, Select } from 'antd';

import Card from '../../components/common/CardTabs';
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
        let id = this.props.personId;
        this.props.dispatch({
            type: 'people/getCarInfoByPersonId',
            payload: {
                id
            }
        })
    }
    onTabClick = (v) => {
        this.setState({
            infoCarIndex: v
        })
    }
    render() {
        const data = this.props.people.carInfo && this.props.people.carInfo.length > 0 ? this.props.people.carInfo : ''
        return (
            <Card
                titleLeft={data ? data[0].carDetailData.plateNumber : '无'}
                titleRight={data ? data[1].carDetailData.plateNumber : '无'}
                onTabClick={this.onTabClick}
                tabIndex={this.state.infoCarIndex}
                >
                <Row gutter={10} className={styles.middleRow}>
                    <Col span={24}>
                        <div className={styles.infoLeftBg} >
                            <img src={data ? data[this.state.infoCarIndex].carDetailData.img[0] : ''} alt="" />
                        </div>
                    </Col>
                </Row>
                {data ? data[this.state.infoCarIndex].perceviceDetailDatas && data[this.state.infoCarIndex].perceviceDetailDatas.length > 0 ?
                    <Row gutter={10} className={styles.middleRow}>
                        <Col span={24}>
                            <div className={styles.infoLeftCon}>
                                {data[this.state.infoCarIndex].perceviceDetailDatas.map(v =>
                                    <div>
                                        <div style={{ marginBottom: 10 }}>
                                            <UnreglarTitle
                                                title={v.inOut == 1 ? '进去' : v.inOut == 2 ? '出去' : '未知'}
                                            />
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 时间 </span>
                                            <span className={styles.infoLeftTxt}> {v.perceptionTime} </span>
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 关卡 </span>
                                            <span className={styles.infoLeftTxt}> {v.name} </span>
                                        </div>
                                    </div>
                                )}

                                {/* <Link to='/house/chart'>
                                    <div className={styles.infoBtn}>轨迹查看</div>
                                </Link> */}
                            </div>
                        </Col>
                    </Row>
                    : '' : ''}

            </Card>
        )
    }
}

export default connect((state) => {
    return { ...state }
})(InfoCar);

