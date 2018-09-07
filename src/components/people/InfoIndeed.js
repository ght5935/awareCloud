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
        const personDetail = this.props.people.personDetail
        const relatedInfo = personDetail.relatedInfo ? personDetail.relatedInfo : []
        return (
            <Card titleLeft={'现有信息'}>
                {
                    relatedInfo.map((v, i) => (
                        <Row gutter={10} className={styles.middleRow} key={i}>
                            <Col span={24}>
                                <div className={styles.infoLeftBg} >
                                    <img src={v} />
                                </div>
                            </Col>
                        </Row>
                    ))
                }
            </Card>
        )
    }
}

export default connect((state, action) => {
    return { ...state, ...action }
})(InfoIndeed);