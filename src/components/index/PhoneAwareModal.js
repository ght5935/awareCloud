import React from 'react';
import moment from 'moment';
import { Modal, Row, Col, Select, DatePicker, Button, Table, Pagination } from 'antd';
import { connect } from 'dva';
import CardTitle from '../common/CardTitle';
import styles from './index.css';
import style from '../../style/common/common.css';
const { RangePicker } = DatePicker;
const { Column } = Table
class PhoneAwareModal extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'global/getPhoneDeviceList'
        })
    }
    onCancel = () => {
        this.props.dispatch({
            type: 'global/success',
            payload: {
                phoneAwareModalVisible: false,
                getPorbeListParams: {
                    stime: '',
                    etime: '',
                    deviceId: '',
                    pageSize: 10,
                    pageNo: 1
                }
            }
        })
    }
    onTimeChange = (data, dataString) => {
        console.log(dataString)
        const getPorbeListParams = this.props.global.getPorbeListParams;
        this.props.dispatch({
            type: 'global/success',
            payload: {
                getPorbeListParams: {
                    ...getPorbeListParams,
                    stime: dataString[0] ? dataString[0] : '',
                    etime: dataString[1] ? dataString[1] : ''
                }
            }
        })
    }
    onDeviceChange = (value) => {

        const getPorbeListParams = this.props.global.getPorbeListParams;
        this.props.dispatch({
            type: 'global/success',
            payload: {
                getPorbeListParams: {
                    ...getPorbeListParams,
                    deviceId: value
                }
            }
        })
    }
    onPagChange = (pageNo, pageSize) => {
        const getPorbeListParams = this.props.global.getPorbeListParams;
        this.props.dispatch({
            type: 'global/success',
            payload: {
                getPorbeListParams: {
                    ...getPorbeListParams,
                    pageNo: pageNo
                }
            }
        });
        this.onSearch();
    }
    onSearch = () => {
        this.props.dispatch({
            type: 'global/getPorbeList'
        })
    }
    render() {
        return (
            <Modal
                visible={this.props.visible}
                footer={null}
                centered
                closable={false}
                onCancel={this.onCancel}
                width={900}
            >
                <span className={styles.close} onClick={this.onCancel}> × </span>
                <CardTitle titleCenter={'手机感知'} className={styles.modalBackColor}>
                    <Row>
                        <Col span={24} style={{ marginBottom: '10px' }}>
                            <div>
                                <div className={styles.cardTitle}>
                                    <div className={styles.titleLeft}>筛选条件</div>
                                    <div className={styles.titleRight}></div>
                                </div>
                                <Row className={styles.searchForm}>
                                    <Col span={8} className={styles.searchItem}>
                                        <span className={styles.label}>设备选择</span>
                                        <Select onChange={this.onDeviceChange} value={this.props.global.getPorbeListParams.deviceId} style={{ width: '60%' }}>
                                        <Select.Option value={''}>全部</Select.Option>
                                            {this.props.global.phoneDeviceList.map(v =>
                                                <Select.Option value={v.id}>{v.name}</Select.Option>)}
                                        </Select>
                                    </Col>
                                    <Col span={14} className={styles.searchItem}>
                                        <span className={styles.label}>时间选择</span>
                                        <RangePicker
                                            showTime={{
                                                defaultValue: [moment('00:00:00', 'HH:mm:ss'),
                                                moment('23:59:59', 'HH:mm:ss')]
                                            }}
                                            format="YYYY-MM-DD HH:mm:ss"
                                            onChange={this.onTimeChange}
                                            value={[this.props.global.getPorbeListParams.stime ? moment(this.props.global.getPorbeListParams.stime) : '',
                                            this.props.global.getPorbeListParams.etime ? moment(this.props.global.getPorbeListParams.etime) : '']}
                                            style={{ width: '75%', background: 'transparent' }} />
                                    </Col>
                                    <Col span={2} className={styles.searchItem}>
                                        <Button type="primary" onClick={this.onSearch}>查询</Button>
                                    </Col>

                                </Row>
                            </div>
                        </Col>
                        <Col span={24}>
                            <div>
                                <div className={styles.cardTitle}>
                                    <div className={styles.titleLeft}>感知数据</div>
                                    <div className={styles.titleRight}></div>
                                </div>
                                <div className={`${styles.searchForm} ${styles.table}`}>
                                    <Table
                                        pagination={false}
                                        dataSource={this.props.global.porbeList}
                                    >

                                        <Column
                                            title="设备信息"
                                            width={300}
                                            dataIndex="deviceName"
                                            key="deviceId"
                                        />

                                        <Column
                                            title="感知时间"
                                            width={300}
                                            dataIndex="probeTime"
                                            key="probeTime"
                                        />

                                        <Column
                                            title="IMSI"
                                            width={300}
                                            dataIndex="imsi"
                                            key="imsi"
                                        />
                                    </Table>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className={`${style.clearfix} ${styles.pagWapper}`}>
                    {!this.props.global.porbeList || this.props.global.porbeList.length <= 0 ? '' :
                       
                            <Pagination
                                className={styles.pagination}
                                current={this.props.global.getPorbeListParams.pageNo}
                                onChange={this.onPagChange}
                                showQuickJumper
                                showTotal={total => `共 ${total} 条`}
                                total={this.props.global.porbePage.total}
                            />
                       }
                        </div>
                </CardTitle>
            </Modal>
        )
    }
}
export default connect(state => {
    return {
        ...state
    };
})(PhoneAwareModal);
