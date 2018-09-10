import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';

import Card from '../../components/common/Card';
import UnreglarTitle from '../../components/common/UnreglarTitle';

import lineImg from '../../assets/home/Line01.png';

import styles from '../../pages/house/index.css';
import r from '../../assets/r.jpeg';

class InfoPerson extends React.Component {
    componentDidMount() {

    }
    openDetail = (value) => {
        const houseInfo = this.props.house.houseInfo;

        this.props.dispatch({
            type: 'house/success',
            payload: {
                houseInfo: {
                    ...houseInfo,
                    personDetail: true,
                    personDetailId: value
                }
            }
        });
    }
    render() {
        const houseInfo = this.props.house.houseInfo;
        const houseInfoData = houseInfo.houseInfoData;
        const personList = houseInfoData.personList;
        return (
            <Card titleLeft={'人员信息'}>
                {
                    personList ? personList.map((item, idx) => (
                        <div className={styles.infoRightContainer} key={idx}>
                            <div style={{ marginBottom: 10 }}>
                                <UnreglarTitle
                                    title={"照片信息"}
                                />
                            </div>
                            <div className={styles.infoRightBtn} onClick={this.openDetail.bind(this, item.id)}>详情 V </div>
                            <div className={styles.infoRightCard}>
                                <div className={styles.infoRightCard_l}>
                                    {/* <img src={r} style={{ width: 115, height: 154 }} alt="" /> */}
                                    <img src={item.img && item.img.length > 0 ? item.img[0] : ''} style={{ width: 115, height: 154 }} alt="" />
                                </div>
                                <div className={styles.infoRightCard_r}>
                                    <div className={styles.infoLeftBg}>
                                        <span className={styles.infoLeftLabel}> 姓名 </span>
                                        <span className={styles.infoLeftTxt}>{item.name}</span>
                                        <img className={styles.line} src={lineImg} alt="" />
                                    </div>
                                    <div className={styles.infoLeftBg}>
                                        <span className={styles.infoLeftLabel}> 标签 </span>
                                        <span className={styles.infoLeftTxt}> {item.houseRelation}</span>
                                        <img className={styles.line} src={lineImg} alt="" />
                                    </div>
                                    <div className={styles.infoLeftBg}>
                                        <span className={styles.infoLeftLabel}> 电话 </span>
                                        <span className={styles.infoLeftTxt}>{item.phone}</span>
                                        <img className={styles.line} src={lineImg} alt="" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : ''
                }
            </Card>
        )
    }
}

export default connect((state, action) => {
    return { ...state, ...action }
})(InfoPerson);