



import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Input, Radio, Row, Col, Select, Modal } from 'antd';

import style from '../../style/common/common.css';
import styles from '../../pages/house/index.css';

const Option = Select.Option;

class HighSearchModal extends React.Component {
    state = {
        // tagType: '0'
    }
    componentDidMount() {
        const houseHome = this.props.house.houseHome;
        const { houseHomeParams } = houseHome;
        this.props.dispatch({
            type: 'house/success',
            payload: {
                houseHome: {
                    ...houseHome,
                    houseHomeParams: {
                        ...houseHomeParams,
                        villageName: this.props.global.houseHome.houseHomeParams.villageName,
                        attribute_id: this.props.global.houseHome.houseHomeParams.attribute_id
                    }
                }
            }
        });
        this.props.dispatch({
            type: 'house/getHouseType'
        })
    }
    onSelectName = e => {
        const houseHome = this.props.house.houseHome;
        const { houseHomeParams } = houseHome;
        this.props.dispatch({
            type: 'house/success',
            payload: {
                houseHome: {
                    ...houseHome,
                    houseHomeParams: {
                        ...houseHomeParams,
                        villageName: e.target.value
                    }
                }
            }
        })

        this.props.dispatch({
            type: 'global/success',
            payload: {
                houseHome: {
                    ...this.props.global.houseHome,
                    houseHomeParams: {
                        ...this.props.global.houseHome.houseHomeParams,
                        villageName: e.target.value
                    }
                }
            }
        })
    }
    onSelectTag = (e) => {
        const houseHome = this.props.house.houseHome;
        const { houseHomeParams } = houseHome;
        this.props.dispatch({
            type: 'house/success',
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

        this.props.dispatch({
            type: 'global/success',
            payload: {
                houseHome: {
                    ...this.props.house.houseHome,
                    houseHomeParams: {
                        ...this.props.house.houseHome.houseHomeParams,
                        attribute_id: e.target.value
                    }
                }
            }
        })
    }
    onSearch = () => {
        this.props.dispatch({
            type: 'house/getHouse'
        })
        this.props.dispatch({
            type: 'global/success',
            payload: {
                searchHouseVisible: false,
            }
        })
    }
    // form
    onSelectBurg = (value) => {
        const houseHome = this.props.house.houseHome;
        const { houseHomeParams } = houseHome;
        this.props.dispatch({
            type: 'house/success',
            payload: {
                houseHome: {
                    ...houseHome,
                    houseHomeParams: {
                        ...houseHomeParams,
                        burg: value
                    }
                }
            }
        })
        if (value) {
            this.props.dispatch({
                type: 'house/getListByOrgunitId'
            })
        }
    }
    onSelectUrban = (value) => {
        const houseHome = this.props.house.houseHome;
        const { houseHomeParams } = houseHome;
        this.props.dispatch({
            type: 'house/success',
            payload: {
                houseHome: {
                    ...houseHome,
                    houseHomeParams: {
                        ...houseHomeParams,
                        orgunitId: value
                    }
                }
            }
        })
        if (value) {
            this.props.dispatch({
                type: 'house/getListByOrgunitId2'
            })
        }
    };
    onSelectVillage = (value) => {
        const houseHome = this.props.house.houseHome;
        const { houseHomeParams } = houseHome;
        this.props.dispatch({
            type: 'house/success',
            payload: {
                houseHome: {
                    ...houseHome,
                    houseHomeParams: {
                        ...houseHomeParams,
                        village: value
                    }
                }
            }
        })
        if (value) {
            this.props.dispatch({
                type: 'house/getBuildingList'
            })
        }
    };
    onSelectBuild = (value) => {
        const houseHome = this.props.house.houseHome;
        const { houseHomeParams } = houseHome;
        this.props.dispatch({
            type: 'house/success',
            payload: {
                houseHome: {
                    ...houseHome,
                    houseHomeParams: {
                        ...houseHomeParams,
                        building: value - 0
                    }
                }
            }
        })
        if (value) {
            this.props.dispatch({
                type: 'house/getUnitList'
            })
        }
    };
    onSelectUnit = (value) => {
        const houseHome = this.props.house.houseHome;
        const { houseHomeParams } = houseHome;
        this.props.dispatch({
            type: 'house/success',
            payload: {
                houseHome: {
                    ...houseHome,
                    houseHomeParams: {
                        ...houseHomeParams,
                        unit: value - 0
                    }
                }
            }
        })
        if (value) {
            this.props.dispatch({
                type: 'house/getFloorList'
            })
        }
    };
    onSelectFloor = (value) => {
        const houseHome = this.props.house.houseHome;
        const { houseHomeParams } = houseHome;
        this.props.dispatch({
            type: 'house/success',
            payload: {
                houseHome: {
                    ...houseHome,
                    houseHomeParams: {
                        ...houseHomeParams,
                        floor: value - 0
                    }
                }
            }
        })
        if (value) {
            this.props.dispatch({
                type: 'house/getRoomList'
            })
        }
    };
    onSelectRoom = (value) => {
        const houseHome = this.props.house.houseHome;
        const { houseHomeParams } = houseHome;
        this.props.dispatch({
            type: 'house/success',
            payload: {
                houseHome: {
                    ...houseHome,
                    houseHomeParams: {
                        ...houseHomeParams,
                        room: value
                    }
                }
            }
        });
    };
    onSelectHouseType = (value) => {
        const houseHome = this.props.house.houseHome;
        const { houseHomeParams } = houseHome;
        this.props.dispatch({
            type: 'house/success',
            payload: {
                houseHome: {
                    ...houseHome,
                    houseHomeParams: {
                        ...houseHomeParams,
                        type_id: value
                    }
                }
            }
        });
    };
    render() {
        const houseHome = this.props.house.houseHome;
        const houseHomeParams = houseHome.houseHomeParams
        return (
            <div className={styles.searchModal} data-id="icon_btn">
                <Row>
                    <Col span={14} className={styles.condition}>
                        <div className={styles.label}>小区名称/地址：</div>
                        <Input
                            style={{ width: '45%' }}
                            onChange={this.onSelectName}
                            value={houseHomeParams.villageName ? houseHomeParams.villageName : ''}
                        />
                    </Col>
                    <Col span={10} className={styles.condition}>
                        <div className={styles.label}>房屋类型：</div>
                        <Select
                            style={{ width: '56%' }}
                            dropdownMatchSelectWidth={false}
                            onChange={this.onSelectHouseType}
                            value={houseHomeParams.type_id ? houseHomeParams.type_id : ''}
                        >
                            <Option value=''>全部</Option>
                            {houseHome.HouseTypeList && houseHome.HouseTypeList.length > 0 ?
                                houseHome.HouseTypeList.map((value, i) =>
                                    <Option
                                        key={i}
                                        value={`${value.id}`}>{value.typeName}</Option>
                                ) : ''}
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={14} className={styles.condition}>
                        <div className={styles.label}>县/镇：</div>
                        <Select
                            style={{ width: '70%' }}
                            onChange={this.onSelectBurg}
                            value={houseHomeParams.burg ? houseHomeParams.burg : ''}
                        >
                            <Option value=''>全部</Option>
                            <Option value={`1`}>浦东镇</Option>
                        </Select>
                    </Col>
                    <Col span={10} className={styles.condition}>
                        <div className={styles.label}>居 委：</div>
                        <Select
                            style={{ width: '70%' }}
                            dropdownMatchSelectWidth={false}
                            onChange={this.onSelectUrban}
                            value={houseHomeParams.orgunitId ? houseHomeParams.orgunitId : ''}
                        >
                            <Option value=''>全部</Option>
                            {houseHome.urbanList && houseHome.urbanList.length > 0 ?
                                houseHome.urbanList.map((value, i) =>
                                    <Option
                                        key={i}
                                        value={`${value.id}`}>{value.name}</Option>
                                ) : ''}
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={14} className={styles.condition}>
                        <div className={styles.label}>小  区：</div>
                        <Select
                            style={{ width: '70%' }}
                            dropdownMatchSelectWidth={false}
                            onChange={this.onSelectVillage}
                            value={houseHomeParams.village ? houseHomeParams.village : ''}
                        >
                            <Option value=''>全部</Option>
                            {houseHome.villageList && houseHome.villageList.length > 0 ?
                                houseHome.villageList.map((value, i) =>
                                    <Option
                                        key={i}
                                        value={`${value.id}`}>{value.name}</Option>
                                ) : ''}
                        </Select>
                    </Col>
                    <Col span={10} className={styles.condition}>
                        <div className={styles.label}>楼 栋：</div>
                        <Select
                            style={{ width: '70%' }}
                            dropdownMatchSelectWidth={false}
                            onChange={this.onSelectBuild}
                            value={`${houseHomeParams.building}`}
                        >
                            <Option value=''>全部</Option>
                            {houseHome.buildList && houseHome.buildList.length > 0 ?
                                houseHome.buildList.map((value, i) =>
                                    <Option
                                        key={value.id}
                                        value={`${value.id}`}>{value.name}</Option>
                                ) : ''}
                        </Select>
                    </Col>
                </Row>
                <Row>
                    <Col span={8} className={styles.condition}>
                        <div className={styles.label}>单元：</div>
                        <Select
                            style={{ width: '66%' }}
                            dropdownMatchSelectWidth={false}
                            onChange={this.onSelectUnit}
                            value={`${houseHomeParams.unit}`}
                        >
                            <Option value=''>全部</Option>
                            {houseHome.UnitList && houseHome.UnitList.length > 0 ?
                                houseHome.UnitList.map((value, i) =>
                                    <Option
                                        key={value.id}
                                        value={`${value.id}`}>{value.name}</Option>
                                ) : ''}
                        </Select>
                    </Col>
                    <Col span={8} className={styles.condition}>
                        <div className={styles.label}>楼层：</div>
                        <Select
                            style={{ width: '66%' }}
                            dropdownMatchSelectWidth={false}
                            onChange={this.onSelectFloor}
                            value={`${houseHomeParams.floor}`}
                        >
                            <Option value=''>全部</Option>
                            {houseHome.FloorList && houseHome.FloorList.length > 0 ?
                                houseHome.FloorList.map((value, i) =>
                                    <Option
                                        key={value.id}
                                        value={`${value.id}`}>{value.name}</Option>
                                ) : ''}
                        </Select>
                    </Col>
                    <Col span={8} className={styles.condition}>
                        <div className={styles.label}>编号：</div>
                        <Select
                            style={{ width: '66%' }}
                            dropdownMatchSelectWidth={false}
                            onChange={this.onSelectRoom}
                            value={`${houseHomeParams.room}`}
                        >
                            <Option value=''>全部</Option>
                            {houseHome.RoomList && houseHome.RoomList.length > 0 ?
                                houseHome.RoomList.map((value) =>
                                    <Option
                                        key={value.id}
                                        value={`${value.room}`}>{value.room}</Option>
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
                            value={houseHomeParams.attribute_id ? houseHomeParams.attribute_id : ''}
                        >
                            {houseHome.AttributeList && houseHome.AttributeList.length > 0 ?
                                houseHome.AttributeList.map((value) =>
                                    <Radio.Button
                                        value={`${value.id}`}
                                        key={value.id}
                                    >{value.attributeName}</Radio.Button>
                                ) : ''}
                        </Radio.Group>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Link to='/house/total' replace>
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