

import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import moment from 'moment';
import { Icon, Input, Button, Radio, Row, Col, Select, DatePicker, Pagination } from 'antd';
import Slogen from '../../components/common/Slogen';

import Card from '../../components/common/Card';
import DetailPeople from '../../components/aware/DetailPeople';
import TrackPeople from '../../components/aware/TrackPeople';

import * as Utils from '../../utils/utils';
import style from '../../style/common/common.css';

import styles from './index.css';
import w from '../../assets/w.jpg';

const Option = Select.Option;
const { RangePicker } = DatePicker;
const similarity = [
    { id: 10, count: 10 },
    { id: 20, count: 20 },
    { id: 30, count: 30 },
    { id: 40, count: 40 },
    { id: 50, count: 50 },
    { id: 60, count: 60 },
    { id: 70, count: 70 },
    { id: 80, count: 80 },
    { id: 90, count: 90 },
    { id: 100, count: 100 },
]
class People extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagType: '0',
            sizeDate: 'all',
            beginTime: '',
            overTime: ''
        };
    }
    componentDidMount() {
        this.props.dispatch({
            type: 'aware/getAllVillage'
        });
        this.props.dispatch({
            type: 'awarePeople/listPoiPre'
        })
    }
    onSelectVillage = value => {
        const awareChart = this.props.aware.carChart
        this.props.dispatch({
            type: 'aware/success',
            payload: {
                awareChart: {
                    ...awareChart,
                    villageId: value
                }
            }
        });
        // this.props.dispatch({
        //     type: 'aware/'
        // })
    }
    onSemtChange = value => {
        const searchParams = this.props.awarePeople.searchParams
        this.props.dispatch({
            type: 'awarePeople/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    orgunitId: value
                }
            }
        })
    }
    onCameraChange = value => {
        const searchParams = this.props.awarePeople.searchParams
        this.props.dispatch({
            type: 'awarePeople/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    cameraId: value
                }
            }
        })
    }

    onTimeChange = (data, dateString) => {

        const searchParams = this.props.awarePeople.searchParams
        this.props.dispatch({
            type: 'awarePeople/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    pageSize: 9,
                    pageNo: 1,
                    startTime: dateString[0],
                    endTime: dateString[1]
                }
            }
        })
        this.setState({
            sizeDate: 'none',
            beginTime: dateString[0],
            overTime: dateString[1]
        })
        if (data && data.length == 0) {
            this.setState({
                sizeDate: 'all',
            })
        }
    }
    onDateChange = (e) => {
        const searchParams = this.props.awarePeople.searchParams
        let timestamp = Math.round(new Date() / 1000)
        let startData;
        let endData = Utils.timestampToTime(timestamp);
        this.setState({ sizeDate: e.target.value });
        switch (e.target.value) {
            case 'oneD':
                startData = Utils.timestampToTime(timestamp - 24 * 60 * 60)
                break;
            case 'sevenD':
                startData = Utils.timestampToTime(timestamp - 24 * 60 * 60 * 7)
                break;
            case 'halfM':
                startData = Utils.timestampToTime(timestamp - 24 * 60 * 60 * 15)
                break;
            case 'oneM':
                startData = Utils.timestampToTime(timestamp - 24 * 60 * 60 * 30)
                break;
            case 'halfY':
                startData = Utils.timestampToTime(timestamp - 24 * 60 * 60 * 30 * 6)
                break;
            case 'oneY':
                startData = Utils.timestampToTime(timestamp - 24 * 60 * 60 * 30 * 12)
                break;
            case 'all':
                startData = '';
                endData = '';
                break;
            default:
                startData = '';
                endData = '';
                break;
        }
        this.setState({
            beginTime: startData,
            overTime: endData
        })
        this.props.dispatch({
            type: 'awarePeople/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    pageSize: 9,
                    pageNo: 1,
                    startTime: startData,
                    endTime: endData
                }
            }
        });
    }

    onSelectName = (e) => {
        const searchParams = this.props.awarePeople.searchParams
        this.props.dispatch({
            type: 'awarePeople/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    name: e.target.value
                }
            }
        })
    }
    onSelectIdCard = (e) => {
        const searchParams = this.props.awarePeople.searchParams
        this.props.dispatch({
            type: 'awarePeople/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    identityCard: e.target.value
                }
            }
        })
    }
    onSimilarityChange = value => {
        const searchParams = this.props.awarePeople.searchParams
        this.props.dispatch({
            type: 'awarePeople/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    startScore: value
                }
            }
        })
    }
    onSimilarityChange1 = value => {
        const searchParams = this.props.awarePeople.searchParams
        this.props.dispatch({
            type: 'awarePeople/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    endScore: value
                }
            }
        })
    }
    onTypeChange = (e) => {
        const searchParams = this.props.awarePeople.searchParams
        this.props.dispatch({
            type: 'awarePeople/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    tag: e.target.value
                }
            }
        })
    }
    onSearch = () => {
        this.props.dispatch({
            type: 'awarePeople/listPoiPre'
        })
    }
    detailCard = (data) => {
        this.props.dispatch({
            type: 'awarePeople/success',
            payload: {
                detailVisible: true,
                peopleModalData: data
            }
        })
    }
    onCancel = () => {
        this.props.dispatch({
            type: 'awarePeople/success',
            payload: {
                detailVisible: false,
                trackVisible: false,
            }
        })
    }
    renderCard = data => {
        return data.map((v, i) => (
            <div className={styles.peopleCard} key={i} onClick={this.detailCard.bind(this, v)}>
                <dl>
                    <dt>
                        <img
                            src={v.ftImgs && v.ftImgs.length > 0 ? v.ftImgs[0] : ""}
                            alt=""
                        />
                    </dt>
                    <dd>摄像头: {v.camera} </dd>
                    <dd>时&nbsp;&nbsp;&nbsp;间: {v.captureTime}</dd>
                    <dd>姓&nbsp;&nbsp;&nbsp;名: {v.poiName}</dd>
                    <dd>身份证: {v.identityCard}</dd>
                    <dd>相似度: {v.score}</dd>
                    <dd>标&nbsp;&nbsp;&nbsp;签: {v.tag}</dd>
                </dl>
                <div className={styles.aim}>
                    <img src={v.poiImgs && v.poiImgs.length > 0 ? v.poiImgs[0] : ""} />
                </div>
            </div>
        ))
    }

    onPageChange = (page, pageSize) => {
        const searchParams = this.props.awarePeople.searchParams
        this.props.dispatch({
            type: 'awarePeople/success',
            payload: {
                searchParams: {
                    ...searchParams,
                    pageNo: page,
                    pageSize
                }
            }
        })
        this.props.dispatch({
            type: 'awarePeople/listPoiPre'
        })
    }
    render() {

        return (
            <div className={styles.aware}>
                <div className={styles.awareTop}>
                    <Slogen type={0}>
                        <Row>
                            <Col span={24} className={styles.selectTop}>
                                <Select
                                    style={{ width: '50%' }}
                                    dropdownMatchSelectWidth={false}
                                    onChange={this.onSelectVillage}
                                    value={`${this.props.aware.awareChart.villageId}`}
                                >
                                    {
                                        this.props.aware.AllVillageList.map((value, i) =>
                                            <Option key={i} value={`${value.id}`}>{value.name}</Option>
                                        )
                                    }
                                </Select>
                            </Col>
                        </Row>
                    </Slogen>
                    <div className={styles.linkBtn} style={{ marginTop: 10 }}>
                        <Link to='/aware'>
                            <div className={styles.btn}>感知统计</div>
                        </Link>
                    </div>
                </div>
                <div className={styles.carCenter}>
                    <Card titleLeft={'查找'}>
                        <Row className={styles.searchForm}>
                            <Col span={7}>
                                <span className={styles.label}>社区</span>
                                <Select
                                    value={this.props.awarePeople.searchParams.orgunitId}
                                    onChange={this.onSemtChange}
                                    style={{ width: '33%' }}
                                >
                                    <Option value="">全部</Option>
                                    {
                                        this.props.aware.AllVillageList.map((value, i) =>
                                            <Option key={i} value={`${value.id}`}>{value.name}</Option>
                                        )
                                    }
                                </Select>
                                <span className={styles.label} style={{ marginLeft: 10 }}> - 摄像头</span>
                                <Select
                                    value={this.props.awarePeople.searchParams.cameraId}
                                    onChange={this.onCameraChange}
                                    style={{ width: '35%' }}
                                >
                                    <Option value="">全部</Option>
                                    <Option value="s1">1号</Option>
                                    <Option value="s2">2号</Option>
                                </Select>
                            </Col>
                            <Col span={7}>
                                <span className={styles.label}>时间</span>
                                <RangePicker
                                    showTime
                                    allowClear
                                    format="YYYY-MM-DD"
                                    style={{ width: '24.4rem', 'background': 'transparent' }}
                                    onChange={this.onTimeChange}
                                    value={this.state.sizeDate !== 'all' ? [moment(this.state.beginTime, 'YYYY-MM-DD'), moment(this.state.overTime, 'YYYY-MM-DD')] : null}
                                />
                            </Col>
                            <Col span={10} className={styles.condition}>
                                <Radio.Group value={this.state.sizeDate} onChange={this.onDateChange} style={{ textAlign: 'center' }}>
                                    <Radio.Button value="oneD" style={{ width: '5rem' }} >今日</Radio.Button>
                                    <Radio.Button value="sevenD" style={{ width: '6rem' }}>最近7天</Radio.Button>
                                    <Radio.Button value="halfM" style={{ width: '6rem' }}>最近15天</Radio.Button>
                                    <Radio.Button value="oneM" style={{ width: '6rem' }}>最近30天</Radio.Button>
                                    <Radio.Button value="halfY" style={{ width: '6rem' }}>最近半年</Radio.Button>
                                    <Radio.Button value="oneY" style={{ width: '6rem' }}>最近一年</Radio.Button>
                                    <Radio.Button value="all" style={{ width: '5rem' }}>全部</Radio.Button>
                                </Radio.Group>
                            </Col>
                        </Row>
                        <Row className={styles.searchForm}>
                            <Col span={3}>
                                <span className={styles.label}>姓名</span>
                                <Input
                                    style={{ width: '75%' }}
                                    onChange={this.onSelectName}
                                    value={`${this.props.awarePeople.searchParams.name}`}
                                />
                            </Col>
                            <Col span={4}>
                                <span className={styles.label} style={{ marginLeft: 23 }}>身份证</span>
                                <Input
                                    style={{ width: '60%' }}
                                    onChange={this.onSelectIdCard}
                                    value={`${this.props.awarePeople.searchParams.identityCard}`}
                                />
                            </Col>
                            <Col span={7}>
                                <span className={styles.label}>相似度</span>
                                <Select
                                    value={this.props.awarePeople.searchParams.startScore}
                                    onChange={this.onSimilarityChange}
                                    style={{ width: '35%' }}
                                >
                                    <Option value="">全部</Option>
                                    {
                                        similarity.map((value, i) =>
                                            <Option key={i} value={`${value.id}`}>{`${value.count}%`}</Option>
                                        )
                                    }
                                </Select>
                                <span className={styles.label}> - </span>
                                <Select
                                    value={this.props.awarePeople.searchParams.endScore}
                                    onChange={this.onSimilarityChange1}
                                    style={{ width: '35%' }}
                                >
                                    <Option value="">全部</Option>
                                    {
                                        similarity.map((value, i) =>
                                            <Option key={i} value={`${value.id}`}>{`${value.count}%`}</Option>
                                        )
                                    }
                                </Select>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={20} className={styles.condition}>
                                <span className={styles.label}>标签</span>
                                <Radio.Group value={this.props.awarePeople.searchParams.tag} onChange={this.onTypeChange} style={{ textAlign: 'center' }}>
                                    <Radio.Button value="" style={{ width: '9rem' }}>不限</Radio.Button>
                                    <Radio.Button value="1" style={{ width: '9rem' }} >普通居民</Radio.Button>
                                    <Radio.Button value="2" style={{ width: '9rem' }}>两劳释放人员</Radio.Button>
                                    <Radio.Button value="3" style={{ width: '9rem' }} >涉赌对象</Radio.Button>
                                    <Radio.Button value="4" style={{ width: '9rem' }}>视线对象</Radio.Button>
                                    <Radio.Button value="5" style={{ width: '9rem' }} >视线对象</Radio.Button>
                                    <Radio.Button value="6" style={{ width: '9rem' }}>精神病人</Radio.Button>
                                    <Radio.Button value="7" style={{ width: '9rem' }} >楼组长</Radio.Button>
                                </Radio.Group>
                            </Col>
                            <Col span={2} className={styles.condition}>
                                <Button type="primary" onClick={this.onSearch}>查 找</Button>
                            </Col>
                        </Row>
                    </Card>
                </div>
                <div className={styles.carBottom}>
                    {this.renderCard(this.props.awarePeople.peopleList)}
                </div>
                <DetailPeople
                    dataSource={this.props.awarePeople.peopleModalData}
                    visible={this.props.awarePeople.detailVisible}
                    width={868}
                    titleLeft={this.state.resultLabel}
                    maskClosable={true}
                    onCancel={this.onCancel}
                />
                <TrackPeople
                    visible={this.props.awarePeople.trackVisible}
                    width={868}
                    titleLeft={this.state.resultLabel}
                    maskClosable={true}
                    onCancel={this.onCancel}
                />
                <Pagination
                    className={style.pagination}
                    current={this.props.awarePeople.searchParams.pageNo}
                    showQuickJumper
                    defaultPageSize={9}
                    onChange={this.onPageChange}
                    pageSize={9}
                    showTotal={total => `共 ${total} 条`}
                    total={this.props.awarePeople.peoplePage.total}
                />
            </div >
        )
    }
}


export default connect((state, action) => {
    return { ...state, ...action }
})(People);
