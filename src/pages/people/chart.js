

import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon, Input, Button, Row, Col, Select } from 'antd';
import { PieChart, Pie, Legend, Tooltip, Cell, Text, Label, ResponsiveContainer, Bar, XAxis, BarChart, LabelList, CartesianGrid } from 'recharts';

import Slogen from '../../components/common/Slogen';
import QueryCard from '../../components/common/QueryCard';
import Card from '../../components/common/Card';
import InfoCard from '../../components/common/InfoCard';
import ChartLabel from './chartLabel';

import style from '../../style/common/common.css';
import styles from './index.css';

import searchIcon from '../../assets/common/search-icon.png'

const Option = Select.Option;
class Chart extends React.Component {

    componentDidMount() {
        this.props.dispatch({
            type: 'people/getChartsInit'
        })
    }
    onVillageChange = (value) => {
        this.props.dispatch({
            type: 'people/getChartsInit',
            payload: {
                orgunitId: value
            }
        });
    }
    render() {
        const COLORS = ['#4B45D1', '#EA218C'];
        const COLORS01 = ['#54ACCB', '#9FD292', '#352559'];
        const COLORS02 = ['#9FD292', '#F55C90', '#54ACCB', '#F7FF34', '#482C87'];
        const data = [
            { name: '男', value: 53 },
            { name: '女', value: 46 }
        ];
        const data01 = [
            { name: '户籍人员', value: 70 },
            { name: '来沪人员', value: 26 },
            { name: '境外人员', value: 3 }
        ];
        const data02 = [
            { name: '1-17', value: 13 },
            { name: '18-29', value: 51 },
            { name: '30-59', value: 28 },
            { name: '60-79', value: 5 },
            { name: '80+', value: 1 }
        ];
        return (
            <div className={styles.chart}>
                <div className={styles.chartTop}>
                    <Slogen type={0}>
                        <Row>
                            <Col span={24} className={styles.selectTop}>
                                <Select style={{ width: '50%' }} defaultValue={this.props.people.allVillage && this.props.people.allVillage.length > 0 ? this.props.people.allVillage[0].id : ''} onChange={this.onVillageChange}>
                                    {this.props.people.allVillage.map(v => <Option value={v.id} key={v.id}>{v.name}</Option>)}
                                </Select>
                            </Col>
                        </Row>
                    </Slogen>
                    <div className={styles.linkBtn} style={{ marginTop: 10 }}>
                        <Link to='/people'>
                            <div className={styles.btn}>地图信息</div>
                        </Link>
                    </div>
                    <div className={styles.topTotal}>
                        <QueryCard>
                            <span>
                                本区域实有人口数：
                            <span className={styles.topNumber}>
                                    {this.props.people.personChart && this.props.people.personChart.perosnCount ?
                                        this.props.people.personChart.perosnCount : ''}
                                </span>
                            </span>
                        </QueryCard>
                    </div>
                </div>
                <div className={styles.chartCenter}>
                    <Card titleLeft={'本区域实有人口分布'}>
                        <Row>
                            <Col span={8}>
                                <div className={styles.PieCard}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={this.props.people.personChart && this.props.people.personChart.genderData ?
                                                    this.props.people.personChart.genderData : []}
                                                innerRadius={60}
                                                outerRadius={80}
                                                dataKey="count"
                                            >
                                                {
                                                    (this.props.people.personChart && this.props.people.personChart.genderData ?
                                                        this.props.people.personChart.genderData : []).map((entry, index) =>
                                                            <Cell stroke={COLORS[index % COLORS.length]} fill={COLORS[index % COLORS.length]} key={index} />)
                                                }
                                                <Label
                                                    position="center"
                                                    value="男女比例"
                                                    fill="#DBDBDB"
                                                />
                                            </Pie>
                                            <Tooltip cursor={{ fill: 'rgba(0,0,0,.2)' }} wrapperStyle={{ background: 'rgba(255,255,255,.3)' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className={styles.PieCardTxt}>
                                    {
                                        COLORS.map((colors, idx) => <ChartLabel
                                            key={idx}
                                            titLabel={this.props.people.personChart && this.props.people.personChart.genderData ?
                                                this.props.people.personChart.genderData[idx].name : []}
                                            titCon={this.props.people.personChart && this.props.people.personChart.genderData ?
                                                `${(this.props.people.personChart.genderData[idx].count / 100).toFixed(2)}%` : 0}
                                            key={idx}>
                                            <span className={styles.LabelBg} style={{ background: `${colors}` }}></span>
                                        </ChartLabel>)
                                    }
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className={styles.PieCard}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={this.props.people.personChart && this.props.people.personChart.censusData ?
                                                    this.props.people.personChart.censusData : []}
                                                innerRadius={60}
                                                outerRadius={80}
                                                dataKey="count"
                                            >
                                                {
                                                    data01.map((entry, index) => <Cell stroke={COLORS01[index % COLORS01.length]} fill={COLORS01[index % COLORS01.length]} key={index} />)
                                                }
                                                <Label
                                                    position="center"
                                                    value="户籍分布"
                                                    fill="#DBDBDB"
                                                />
                                            </Pie>
                                            <Tooltip cursor={{ fill: 'rgba(0,0,0,.2)' }} wrapperStyle={{ background: 'rgba(255,255,255,.3)' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className={styles.PieCardTxt}>
                                    {
                                        COLORS01.map((colors, idx) => <ChartLabel
                                            key={idx}
                                            titLabel={this.props.people.personChart && this.props.people.personChart.censusData ?
                                                this.props.people.personChart.censusData[idx].name : []}
                                            titCon={this.props.people.personChart && this.props.people.personChart.censusData ?
                                                `${(this.props.people.personChart.censusData[idx].count / 100).toFixed(2)}%` : 0}
                                            key={idx}>
                                            <span className={styles.LabelBg} style={{ background: `${colors}` }}></span>
                                        </ChartLabel>)
                                    }
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className={styles.PieCard}>
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie
                                                data={this.props.people.personChart && this.props.people.personChart.ageData ?
                                                    this.props.people.personChart.ageData : []}
                                                innerRadius={60}
                                                outerRadius={80}
                                                dataKey="count"
                                            >

                                                {
                                                    data02.map((entry, index) => <Cell stroke={COLORS02[index % COLORS02.length]} fill={COLORS02[index % COLORS02.length]} key={index} />)
                                                }
                                                <Label
                                                    position="center"
                                                    value="年龄分布"
                                                    fill="#DBDBDB"
                                                />
                                            </Pie>
                                            <Tooltip cursor={{ fill: 'rgba(0,0,0,.2)' }} wrapperStyle={{ background: 'rgba(255,255,255,.3)' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className={styles.PieCardTxt}>
                                    {
                                        COLORS02.map((colors, idx) => <ChartLabel
                                            key={idx}
                                            titLabel={this.props.people.personChart && this.props.people.personChart.ageData ?
                                                this.props.people.personChart.ageData[idx].name : []}
                                            titCon={this.props.people.personChart && this.props.people.personChart.ageData ?
                                                `${(this.props.people.personChart.ageData[idx].count / 100).toFixed(2)}%` : 0}
                                            key={idx}>
                                            <span className={styles.LabelBg} style={{ background: `${colors}` }}></span>
                                        </ChartLabel>)
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Card>
                </div>
                <div className={styles.chartBottom}>
                    <Row>
                        <Col span={24}>
                            <Card titleLeft={'人口标签统计'}>
                                <div className={styles.BarCard}>
                                    <ResponsiveContainer width="100%" height={280}>
                                        <BarChart data={this.props.people.tagChart ?
                                            this.props.people.tagChart : []}>
                                            <CartesianGrid stroke="#3F576F" />
                                            <XAxis dataKey="name" stroke="#DBDBDB" />
                                            <Tooltip cursor={{ fill: 'rgba(0,0,0,.2)' }} wrapperStyle={{ background: 'rgba(255,255,255,.3)' }} />
                                            <XAxis dataKey="name" tick={{ stroke: '#DBDBDB', strokeWidth: 1 }} />
                                            <Bar dataKey="count" fill="#3D938D" barSize={40}>
                                                <LabelList dataKey="count" position="center" fill="#DBDBDB" />
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div >
        );
    }
}

export default connect((state) => {
    return { ...state }
})(Chart);