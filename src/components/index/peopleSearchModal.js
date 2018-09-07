
import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Input, Radio, Row, Col } from 'antd';

import style from '../../style/common/common.css';
import styles from './index.css';

class HighSearchModal extends React.Component {
    state = {
        tagType: ''
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'global/getAllTag'
        })
    }
    handleSizeChange = (e) => {
        this.setState({ tagType: e.target.value });
    }
    onSelectName = e => {
        const peopleSearch = this.props.global.peopleSearch;
        this.props.dispatch({
            type: 'global/success',
            payload: {
                peopleSearch: {
                    ...peopleSearch,
                    name: e.target.value
                }
            }
        })
    }
    onSelectIdCard = (e) => {
        const peopleSearch = this.props.global.peopleSearch;
        this.props.dispatch({
            type: 'global/success',
            payload: {
                peopleSearch: {
                    ...peopleSearch,
                    idCard: e.target.value
                }
            }
        })
    }
    onSelectTag = (e) => {
        const peopleSearch = this.props.global.peopleSearch;
        this.setState({ tagType: e.target.value });
        this.props.dispatch({
            type: 'global/success',
            payload: {
                peopleSearch: {
                    ...peopleSearch,
                    tag: e.target.value
                }
            }
        })
    }
    render() {
        const globalData = this.props.global;
        return (
            <div className={styles.searchModal} data-id="icon_btn">
                <Row>
                    <Col span={10} className={styles.condition}>
                        <div className={styles.label}>姓名：</div>
                        <Input
                            style={{ width: '65%', marginLeft: '5px' }}
                            value={`${globalData.peopleSearch.name}`}
                            onChange={this.onSelectName}
                        />
                    </Col>
                    <Col span={14} className={styles.condition}>
                        <div className={styles.label}>身份证号：</div>
                        <Input
                            style={{ width: '64%' }}
                            value={`${globalData.peopleSearch.idCard}`}
                            onChange={this.onSelectIdCard}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className={styles.condition}>
                        <div className={styles.label}>标签：</div>
                        <Radio.Group value={`${globalData.peopleSearch.tag}`} onChange={this.onSelectTag} style={{ width: '88%', textAlign: 'left' }}>
                            {globalData.allTag && globalData.allTag.length > 0 ?
                                globalData.allTag.map((value) =>

                                    <Radio.Button
                                        value={`${value.id}`}
                                        key={value.id}
                                    >{value.name}</Radio.Button>
                                ) : ''}
                        </Radio.Group>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Link to='/people/search'>
                            <span className={styles.btnOk}>搜 索</span>
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