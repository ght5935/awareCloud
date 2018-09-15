



import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Input, Radio, Row, Col, Select, Modal } from 'antd';

import { PROVINCE_FOR_SHORT } from '../../utils/config'

import style from '../../style/common/common.css';
import styles from '../../pages/house/index.css';

const Option = Select.Option;

class SearchModal extends React.Component {
    state = {

    }
    componentDidMount() {
        this.props.dispatch({
            type: 'car/getProvince'
        })
        this.props.dispatch({
            type: 'car/getCarModel'
        })
        this.props.dispatch({
            type: 'car/getColor'
        })
        this.props.dispatch({
            type: 'car/getCarBrand'
        })
        this.props.dispatch({
            type: 'car/getPlateType'
        })
        this.props.dispatch({
            type: 'car/getAllVillage'
        })
    }

    onSearch = () => {
        this.props.dispatch({
            type: 'car/getCar'
        })
        this.props.dispatch({
            type: 'global/success',
            payload: {
                searchHouseVisible: false,
            }
        })
    }
    // form
    onSelectProvince = value => {
        const carSearch = this.props.car.carSearch;
        const { carSearchParams } = carSearch;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                carSearch: {
                    ...carSearch,
                    carSearchParams: {
                        ...carSearchParams,
                        province: value
                    }
                }
            }
        })

        this.props.dispatch({
            type: 'global/success',
            payload: {
                carSearch: {
                    ...this.props.global.carSearch,
                    carSearchParams: {
                        ...this.props.global.carSearch.carSearchParams,
                        province: value
                    }
                }
            }
        })
    }
    onSelectLicences = e => {
        const carSearch = this.props.car.carSearch;
        const { carSearchParams } = carSearch;
        this.props.dispatch({
            type: 'car/success',
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
        this.props.dispatch({
            type: 'global/success',
            payload: {
                carSearch: {
                    ...this.props.global.carSearch,
                    carSearchParams: {
                        ...this.props.global.carSearch.carSearchParams,
                        plate_number: e.target.value
                    }
                }
            }
        })
    }
    onSelectType = (value) => {
        const carSearch = this.props.car.carSearch;
        const { carSearchParams } = carSearch;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                carSearch: {
                    ...carSearch,
                    carSearchParams: {
                        ...carSearchParams,
                        model: value
                    }
                }
            }
        });
    };
    onSelectBrand = (value) => {
        const carSearch = this.props.car.carSearch;
        const { carSearchParams } = carSearch;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                carSearch: {
                    ...carSearch,
                    carSearchParams: {
                        ...carSearchParams,
                        brand: value
                    }
                }
            }
        });
    };
    onSelectColors = (value) => {
        const carSearch = this.props.car.carSearch;
        const { carSearchParams } = carSearch;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                carSearch: {
                    ...carSearch,
                    carSearchParams: {
                        ...carSearchParams,
                        color: value
                    }
                }
            }
        });
    };
    onSelectName = (e) => {
        const carSearch = this.props.car.carSearch;
        const carSearchParams = carSearch.carSearchParams
        this.props.dispatch({
            type: 'car/success',
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

        this.props.dispatch({
            type: 'global/success',
            payload: {
                carSearch: {
                    ...this.props.global.carSearch,
                    carSearchParams: {
                        ...this.props.global.carSearch.carSearchParams,
                        name: e.target.value
                    }
                }
            }
        })
    }
    onSelectPhone = (e) => {
        const carSearch = this.props.car.carSearch;
        const { carSearchParams } = carSearch;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                carSearch: {
                    ...carSearch,
                    carSearchParams: {
                        ...carSearchParams,
                        phone: e.target.value
                    }
                }
            }
        });
    };
    onSelectVillage = (value) => {
        const carSearch = this.props.car.carSearch;
        const { carSearchParams } = carSearch;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                carSearch: {
                    ...carSearch,
                    carSearchParams: {
                        ...carSearchParams,
                        orgunitId: value
                    }
                }
            }
        });
    };
    onSelectTag = (e) => {
        const carSearch = this.props.car.carSearch;
        const { carSearchParams } = carSearch;
        const { searchInfo } = carSearch;
        this.props.dispatch({
            type: 'car/success',
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

        this.props.dispatch({
            type: 'global/success',
            payload: {
                carSearch: {
                    ...this.props.global.carSearch,
                    carSearchParams: {
                        ...this.props.global.carSearch.carSearchParams,
                        plate_type: e.target.value
                    }
                }
            }
        })
    }
    onCancel = () => {
        const carSearch = this.props.car.carSearch;
        const { carSearchParams } = carSearch;
        this.props.dispatch({
            type: 'car/success',
            payload: {
                carSearch: {
                    ...carSearch,
                    carSearchParams: {
                        ...carSearchParams,
                        province: '',
                        plate_number: '',
                        model: '',
                        brand: '',
                        color: '',
                        name: '',
                        phone: '',
                        orgunitId: '',
                        plate_type: ''
                    }
                }
            }
        })
        this.props.dispatch({
            type: 'global/success',
            payload: {
                carSearch: {
                    ...this.props.global.carSearch,
                    carSearchParams: {
                        ...this.props.global.carSearch.carSearchParams,
                        name: '',
                        province: '',
                        plate_number: '',
                        plate_type: ''
                    }
                },
                searchHouseVisible: false
            }
        })
    }
    render() {
        const car = this.props.car;
        const carSearch = this.props.car.carSearch;
        return (

            <div className={styles.searchModal} data-id="icon_btn">
                <Row>
                    <Col span={12} className={styles.condition}>
                        <div className={styles.label}>车牌：</div>
                        <Select
                            style={{ width: '28%' }}
                            dropdownMatchSelectWidth={false}
                            onChange={this.onSelectProvince}
                            value={`${carSearch.carSearchParams.province}`}
                        >
                            <Option value=''>全部</Option>
                            {car.provinceList && car.provinceList.length > 0 ?
                                car.provinceList.map((value, i) =>
                                    <Option key={i} value={`${value.id}`}>{value.province}</Option>
                                ) : ''}
                        </Select>
                        <Input
                            style={{ width: '45%' }}
                            value={`${carSearch.carSearchParams.plate_number}`}
                            onChange={this.onSelectLicences}
                        />
                    </Col>
                    <Col span={12} className={styles.condition}>
                        <div className={styles.label}>车型：</div>
                        <Select
                            style={{ width: '73%' }}
                            dropdownMatchSelectWidth={false}
                            onChange={this.onSelectType}
                            value={`${carSearch.carSearchParams.model}`}
                        >
                            <Option value=''>全部</Option>
                            {car.typeList && car.typeList.length > 0 ?
                                car.typeList.map((value, i) =>
                                    <Option key={i} value={`${value.id}`}>{value.modelStr}</Option>
                                ) : ''}
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} className={styles.condition}>
                        <div className={styles.label}>车辆品牌：</div>
                        <Select
                            style={{ width: '60%' }}
                            onChange={this.onSelectBrand}
                            value={`${carSearch.carSearchParams.brand}`}
                        >
                            <Option value=''>全部</Option>
                            {car.brandList && car.brandList.length > 0 ?
                                car.brandList.map((value, i) =>
                                    <Option
                                        key={i}
                                        value={`${value.id}`}>{value.brand}</Option>
                                ) : ''}
                        </Select>
                    </Col>
                    <Col span={12} className={styles.condition}>
                        <div className={styles.label}>车辆颜色：</div>
                        <Select
                            style={{ width: '60%' }}
                            dropdownMatchSelectWidth={false}
                            onChange={this.onSelectColors}
                            value={`${carSearch.carSearchParams.color}`}
                        >
                            <Option value=''>全部</Option>
                            {car.colorsList && car.colorsList.length > 0 ?
                                car.colorsList.map((value, i) =>
                                    <Option
                                        key={i}
                                        value={`${value.id}`}>{value.color}</Option>
                                ) : ''}
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} className={styles.condition}>
                        <div className={styles.label}>车主姓名：</div>
                        <Input
                            style={{ width: '60%' }}
                            onChange={this.onSelectName}
                            value={`${carSearch.carSearchParams.name}`}
                        />
                    </Col>
                    <Col span={12} className={styles.condition}>
                        <div className={styles.label}>车主手机：</div>
                        <Input
                            style={{ width: '60%' }}
                            onChange={this.onSelectPhone}
                            value={`${carSearch.carSearchParams.phone}`}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={12} className={styles.condition}>
                        <div className={styles.label}>所属社区：</div>
                        <Select
                            style={{ width: '60%' }}
                            dropdownMatchSelectWidth={false}
                            onChange={this.onSelectVillage}
                            value={`${carSearch.carSearchParams.orgunitId}`}
                        >
                            <Option value=''>全部</Option>
                            {car.AllVillageList && car.AllVillageList.length > 0 ?
                                car.AllVillageList.map((value, i) =>
                                    <Option
                                        key={value.id}
                                        value={`${value.id}`}>{value.name}</Option>
                                ) : ''}
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} className={styles.condition}>
                        <div className={styles.label}>标签：</div>
                        <Radio.Group
                            style={{ width: '88%', textAlign: 'center' }}
                            onChange={this.onSelectTag}
                            value={`${carSearch.carSearchParams.plate_type}`}
                        >
                            <Radio.Button value=''> 不 限</Radio.Button>
                            {car.plateList && car.plateList.length > 0 ?
                                car.plateList.map((value) =>
                                    <Radio.Button
                                        value={`${value.id}`}
                                        key={value.id}
                                    >{value.plateTypeStr}</Radio.Button>
                                ) : ''}
                        </Radio.Group>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={{ textAlign: 'center' }}>
                        <Link to='/car/search' replace>
                            <span className={styles.btnOk} onClick={this.onSearch}>搜 索</span>
                        </Link>
                    </Col>
                    <Col span={12} style={{ textAlign: 'center' }}>
                        <span className={styles.btnOk} onClick={this.onCancel}>取 消</span>
                    </Col>
                </Row>
            </div>

        )
    }
}

export default connect((state, action) => {
    return { ...state, ...action }
})(SearchModal);