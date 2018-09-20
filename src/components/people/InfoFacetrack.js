
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Select } from 'antd';

import Card from '../common/Card';
import UnreglarTitle from '../common/UnreglarTitle'

import style from '../../style/common/common.css';
import styles from './index.css';

class InfoFacetrack extends React.Component {
    componentDidMount() {
        this.props.dispatch({
            type: 'people/getPersonFacePerveiceById'
        });
    }
    render() {
        const data = this.props.people.personFace
        return (
            <Card titleLeft={'最近'}>
                <Row gutter={10} className={styles.middleRow}>
                    <Col span={24}>
                        <div className={styles.infoLeftCon}>
                            {data && data.length > 0 ?
                                data.map((v, i) => (
                                    <div key={i}>
                                        <div style={{ marginBottom: 10 }}>
                                            <UnreglarTitle
                                                title={v.type}
                                            />
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 时间 </span>
                                            <span className={styles.infoLeftTxt}> {v.time} </span>
                                        </div>
                                        <div className={styles.infoLeftBg}>
                                            <span className={styles.infoLeftLabel}> 关卡 </span>
                                            <span className={styles.infoLeftTxt}> {v.address} </span>
                                        </div>
                                    </div>
                                ))
                                : <div className={styles.noDom}> 无轨迹信息 </div>}
                        </div>
                    </Col>
                </Row>
            </Card>
        )
    }
}


export default connect((state) => {
    return { ...state }
})(InfoFacetrack);
