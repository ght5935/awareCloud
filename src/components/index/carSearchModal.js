



import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Input, Radio, Row, Col, Select } from 'antd';

import Animate from 'rc-animate';

import style from '../../style/common/common.css';
import styles from './index.css';
import { PROVINCE_FOR_SHORT } from '../../utils/config'

const Option = Select.Option;

class SearchModal extends React.Component {
    state = {
        tagType: ''
    }
    componentDidMount() {
        // this.props.dispatch({
        //     type: 'car/getProvince'
        // })
        // this.props.dispatch({
        //     type: 'car/getPlateType'
        // })
    }
    onSelectProvince = value => {
        const carSearch = this.props.global.carSearch;
        const { carSearchParams } = carSearch;
        this.props.dispatch({
            type: 'global/success',
            payload: {
                carSearch: {
                    ...carSearch,
                    carSearchParams: {
                        ...carSearchParams,
                        province: value
                    }
                }
            }
        });
    }
    onSelectLicences = e => {
        const carSearch = this.props.global.carSearch;
        const { carSearchParams } = carSearch;
        this.props.dispatch({
            type: 'global/success',
            payload: {
                carSearch: {
                    ...carSearch,
                    carSearchParams: {
                        ...carSearchParams,
                        plate_number: e.target.value
                    }
                }
            }
        })
    }
    onSelectName = (e) => {
        const carSearch = this.props.global.carSearch;
        const carSearchParams = carSearch.carSearchParams
        this.props.dispatch({
            type: 'global/success',
            payload: {
                carSearch: {
                    ...carSearch,
                    carSearchParams: {
                        ...carSearchParams,
                        name: e.target.value
                    }
                }
            }
        })
    };
    onSelectTag = (e) => {
        const carSearch = this.props.global.carSearch;
        const { carSearchParams } = carSearch;
        this.setState({ tagType: e.target.value });
        this.props.dispatch({
            type: 'global/success',
            payload: {
                carSearch: {
                    ...carSearch,
                    carSearchParams: {
                        ...carSearchParams,
                        plate_type: e.target.value
                    }
                }
            }
        })
    }
    onSearch = () => {
        // this.props.dispatch({
        //     type: 'car/getCar'
        // })
    }
    render() {
        const data = this.props.global
        const carSearch = this.props.global.carSearch;
        return (
            <div
                style={{ width: '536px' }}
                data-id="icon_btn"
                className={styles.searchModal}>
                <Row>
                    <Col span={12} className={styles.condition}>
                        <div className={styles.label}>车牌：</div>
                        <Select
                            style={{ width: '22%' }}
                            dropdownMatchSelectWidth={false}
                            onChange={this.onSelectProvince}
                            value={`${carSearch.carSearchParams.province}`}
                        >
                            {data.provinceList && data.provinceList.length > 0 ?
                                data.provinceList.map((value, i) =>
                                    <Option
                                        key={i}
                                        value={`${value.id}`}>{value.province}</Option>
                                ) : null}
                        </Select>
                        <Input
                            style={{ width: '50%' }}
                            onChange={this.onSelectLicences}
                        />
                    </Col>
                    <Col span={12} className={styles.condition}>
                        <div className={styles.label}>车主：</div>
                        <Input
                            style={{ width: '74%' }}
                            onChange={this.onSelectName}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className={styles.condition}>
                        <div className={styles.label}>标签：</div>
                        <Radio.Group value={this.state.tagType} onChange={this.onSelectTag} style={{ width: '88%', textAlign: 'center' }}>
                            {data.plateList && data.plateList.length > 0 ?
                                data.plateList.map((value) =>
                                    <Radio.Button
                                        value={`${value.id}`}
                                        key={value.id}
                                    >{value.plateTypeStr}</Radio.Button>
                                ) : ''}
                        </Radio.Group>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Link to='/car/search'>
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
})(SearchModal);
