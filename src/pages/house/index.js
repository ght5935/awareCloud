

import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon, Input, Button, Radio, Row, Col, Select, Modal } from 'antd';

import Slogen from '../../components/common/Slogen';
import Card from '../../components/common/Card';
import InfoCard from '../../components/common/InfoCard';
import TotalCard from '../../components/common/totalCard';
import SearchHighModal from '../../components/house/searchHighModal';

import style from '../../style/common/common.css';
import styles from './index.css';

import searchIcon from '../../assets/common/search-icon.png'

const Option = Select.Option;

class Index extends React.Component {
  state = {

  }
  componentDidMount() {
    this.props.dispatch({
      type: 'house/getHouseAmountByVillage'
    })
  }
  componentWillUnmount() {
    this.props.dispatch({
      type: 'global/success',
      payload: {
        searchHouseVisible: false,
      }
    })
  }
  searchModalClick = () => {
    this.props.dispatch({
      type: 'global/success',
      payload: {
        searchHouseVisible: !this.props.global.searchHouseVisible,
      }
    })
  }
  onSelectVillage = (value) => {
    const house = this.props.house;
    this.props.dispatch({
      type: 'house/success',
      payload: {
        selectVillage: value
      }
    });
  }
  renderHouseNum = value => {
    return value.map((item, idx) => {
      return (
        <div key={idx} className={styles.totalNumber} >
          <InfoCard
            titleLabel={item.name}
            titleCon={item.amount}
          />
        </div>)
    })
  }
  renderHouseType = value => {
    return value.map((item, idx) => {
      return (
        <div key={idx} className={styles.totalType} >
          <TotalCard
            totalLabel={item.typeName}
            totalCon={item.typeAmount}
          />
        </div>)
    })
  }
  render() {
    const house = this.props.house;
    const houseTotal = house.houseTotal;
    return (
      <div className={styles.total}>
        <div className={styles.totalTop}>
          <Slogen type={2}>
            <Row>
              <Col span={24} className={styles.selectTop}>
                <span className={styles.title}>实有房屋</span>
                <span className={styles.title} style={{ fontSize: 15 }}>-房屋统计</span>
              </Col>
            </Row>
            <img src={searchIcon} className={styles.titleIcon} onClick={this.searchModalClick} />
          </Slogen>
          <div className={styles.linkBtn}>
            <Link to='/house/chart'>
              <div className={styles.btn}> 图表信息</div>
            </Link>
          </div>
        </div>
        <div className={styles.totalLeft}>
          <Card titleLeft={'各社区房屋数'}>
            <div className={styles.totalNumberCard}>
              {this.renderHouseNum(houseTotal.houseNumber)}
            </div>
          </Card>
          <Card titleLeft={'房屋类型统计'}>
            <div className={styles.totalNumberCard}>
              {this.renderHouseType(houseTotal.houseType)}
            </div>
          </Card>
        </div>
        {this.props.global.searchHouseVisible ? <SearchHighModal /> : ''}
      </div>
    );
  }
}

export default connect((state, action) => {
  return { ...state, ...action }
})(Index);
