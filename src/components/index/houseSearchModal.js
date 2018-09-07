



import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Input, Radio, Row, Col } from 'antd';

import style from '../../style/common/common.css';
import styles from './index.css';

class HighSearchModal extends React.Component {
    state = {
        tagType: '0'
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'global/getHouseAttribute'
        })
    }
    onSelectName = e => {
        const houseHome = this.props.global.houseHome;
        const { houseHomeParams } = houseHome;
        this.props.dispatch({
            type: 'global/success',
            payload: {
                houseHome: {
                    ...houseHome,
                    houseHomeParams: {
                        ...houseHomeParams,
                        villageName: e.target.value
                    }
                }
            }
        });
    }
    onSelectTag = (e) => {
        const houseHome = this.props.global.houseHome;
        const { houseHomeParams } = houseHome;
        const { searchInfo } = houseHome;
        this.setState({ tagType: e.target.value });
        this.props.dispatch({
            type: 'global/success',
            payload: {
                houseHome: {
                    ...houseHome,
                    houseHomeParams: {
                        ...houseHomeParams,
                        attribute_id: e.target.value
                    }
                }
            }
        })
    }
    onSearch = () => {
        // this.props.dispatch({
        //     type: 'house/getHouse'
        // })
    }
    render() {
        const houseHome = this.props.global.houseHome;
        return (
            <div className={styles.searchModal} data-id="icon_btn">
                <Row>
                    <Col span={24} className={styles.condition}>
                        <div className={styles.label}>社区名称/地址：</div>
                        <Input
                            style={{ width: '70%' }}
                            onChange={this.onSelectName}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className={styles.condition}>
                        <div className={styles.label}>标签：</div>
                        <Radio.Group value={this.state.tagType} onChange={this.onSelectTag} style={{ width: '88%', textAlign: 'center' }}>
                            <div className={styles.butRadio}>
                                {houseHome.AttributeList && houseHome.AttributeList.length > 0 ?
                                    houseHome.AttributeList.map((value) =>

                                        <Radio.Button
                                            value={`${value.id}`}
                                            key={value.id}
                                        >{value.attributeName}</Radio.Button>
                                    ) : ''}
                            </div>
                        </Radio.Group>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Link to='/house/total'>
                            <span className={styles.btnOk} onClick={this.onSearch}>搜 索</span>
                        </Link>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default connect((state, action) => {
    return { ...state, ...action }
})(HighSearchModal);