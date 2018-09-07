

import React from 'react';
import { connect } from 'dva';
import Link from 'umi/link';
import { Icon, Input, Button, Radio, Row, Col, Select } from 'antd';

import Slogen from '../../components/common/Slogen';
import Card from '../../components/common/Card';
import InfoCard from '../../components/common/InfoCard';
import InfoiconCard from '../../components/common/InfoiconCard';
import ModalCard from '../../components/common/ModalCard';
import ResultCard from '../../components/common/ResultCard';

import SearchHighModal from '../../components/house/searchHighModal';

import style from '../../style/common/common.css';
import styles from './index.css';

import searchIcon from '../../assets/common/search-icon.png'
import smHouseIcon from '../../assets/home/indeed-house-icon.png';
import w from '../../assets/w.jpg';
import { stat } from 'fs';
import { DEFAULT_ECDH_CURVE } from 'tls';

import * as Utils from '../../utils/utils';

const Option = Select.Option;

class Total extends React.Component {
  state = {
    resultVisible: false,
    resultLabel: ''
  }
  componentDidMount() {
    const houseHome = this.props.house.houseHome;
    const { houseHomeParams } = houseHome;
    this.props.dispatch({
      type: 'house/success',
      payload: {
        houseHome: {
          ...houseHome,
          AttributeList: this.props.global.houseHome.AttributeList,
          houseHomeParams: {
            ...houseHomeParams,
            villageName: this.props.global.houseHome.houseHomeParams.villageName,
            attribute_id: this.props.global.houseHome.houseHomeParams.attribute_id
          }
        }
      }
    })
    this.props.dispatch({
      type: 'house/getHouse'
    })

  }
  componentWillUnmount() {
    console.log('%chouse清除参数','color:red')
    const houseHome = this.props.house.houseHome;
    const { houseHomeParams } = houseHome;
    this.props.dispatch({
      type: 'house/success',
      payload: {
        houseHome: {
          ...houseHome,
          houseHomeParams: {
            ...houseHomeParams,
            burg: '',
            villageName: '',
            orgunitId: '',
            village: '',
            building: '',
            unit: '',
            floor: '',
            room: '',
            type_id: '',
            attribute_id: ''
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
            villageName: '',
            attribute_id:''
          }
        }
      }
    });
  }
  searchModalClick = () => {
    this.props.dispatch({
      type: 'global/success',
      payload: {
        searchHouseVisible: !this.props.global.searchHouseVisible,
      }
    })
  }
  resultClick = (name) => {
    this.props.dispatch({
      type: 'global/success',
      payload: {
        searchHouseVisible: false,
      }
    });
    this.setState({
      resultVisible: true,
      resultLabel: name
    })
  }
  onCancel = () => {
    this.setState({
      resultVisible: false
    })
  }
  onSelectModal = (id) => {
    const house = this.props.house;
    const { houseHome } = house;
    this.setState({
      resultLabel: '房屋数'
    })
    this.props.dispatch({
      type: 'house/success',
      payload: {
        houseHome: {
          ...houseHome,
          villageOrgunitId: id
        }
      }
    })
    this.props.dispatch({
      type: 'house/getHouseInfoByOrgunitId'
    })
    this.renderResultContainer(this.state.resultLabel, houseHome.villageOrgunitIdList)
  }
  renderResultContainer = (resultLabel, data) => {
    let Ele;
    let villageAmountDataList = data.villageAmountDataList ? data.villageAmountDataList : [];
    let houseImageDataList = data.houseImageDataList ? data.houseImageDataList : [];
    switch (resultLabel) {
      case '房屋数':
        Ele = houseImageDataList.map((item, idx) =>
          <Link to={`/house/info?houseId=${item.houseId}`} key={idx}>
            <div className={styles.resultCon1} >
              <img src={item.houseImg} alt="" className={styles.resultCon1Img} />
              <InfoiconCard
                className={styles.resultInfoiconCard}
                titLabel={'住址'}
                titCon={item.address}
                iSarrow={false}
              />
            </div>
          </Link>
        )
        break;
      case '房屋所属社区数':
        Ele = villageAmountDataList.map((item, idx) =>
          <div className={styles.resultCon} key={idx} onClick={this.onSelectModal.bind(this, item.id)}>
            <ResultCard
              titleLabel={item.name}
              titleCon={item.amount}
            />
          </div>)
        break;
    }
    return Ele
  }
  render() {
    const house = this.props.house;
    const { houseHome } = house;
    const { houseHomeParams } = houseHome;
    return (
      <div className={styles.total}>
        <div className={styles.totalTop}>
          <Slogen type={2}>
            <Row>
              <Col span={24} className={styles.selectTop}>
                <span className={styles.title}>实有房屋</span>
                <span className={styles.title} style={{ fontSize: 15 }}>-房屋搜索</span>
              </Col>
            </Row>
            <img src={searchIcon} className={styles.titleIcon} data-id="icon_btn" onClick={this.searchModalClick} />
          </Slogen>
          <div className={styles.linkBtn}>
            <Link to='/house/chart'>
              <div className={styles.btn}>图表信息</div>
            </Link>
          </div>
        </div>
        <div className={styles.indexLeft}>
          <Card titleLeft={'搜索条件'}>
            <Row className={styles.middleRow} gutter={20}>
              <Col span={8}>
                <InfoCard
                  titleLabel={'社区名称/地址'}
                  titleCon={houseHomeParams.villageName ? houseHomeParams.villageName : ''}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'房屋类型'}
                  titleCon={Utils.getDataFromArr(houseHome.HouseTypeList, houseHomeParams.type_id, 'typeName')}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'县/镇'}
                  titleCon={`${houseHomeParams.burg !== '' ? houseHomeParams.burg.split('|')[1] : ''}`}
                  titleCon={Utils.getDataFromArr([{ id: 1, name: '浦东镇' }], houseHomeParams.burg, 'name')}
                />
              </Col>
            </Row>
            <Row className={styles.middleRow} gutter={20}>
              <Col span={8}>
                <InfoCard
                  titleLabel={'居委'}
                  titleCon={Utils.getDataFromArr(houseHome.urbanList, houseHomeParams.orgunitId, 'name')}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'小区'}
                  titleCon={Utils.getDataFromArr(houseHome.villageList, houseHomeParams.village, 'name')}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'楼栋'}
                  titleCon={Utils.getDataFromArr(houseHome.buildList, houseHomeParams.building, 'name')}
                />
              </Col>
            </Row>
            <Row gutter={20} className={styles.middleRow}>
              <Col span={8}>
                <InfoCard
                  titleLabel={'单元'}
                  titleCon={Utils.getDataFromArr(houseHome.UnitList, houseHomeParams.unit, 'name')}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'楼层'}
                  titleCon={Utils.getDataFromArr(houseHome.FloorList, houseHomeParams.floor, 'name')}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'房屋编号'}
                  titleCon={houseHomeParams.room}
                />
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={8}>
                <InfoCard
                  titleLabel={'标签'}
                  titleCon={Utils.getDataFromArr(houseHome.AttributeList, houseHomeParams.attribute_id, 'attributeName')}
                />
              </Col>
            </Row>
          </Card>
          <Card titleLeft={'搜索结果'}>
            <Row className={styles.middleRow} gutter={20}>
              <Col span={12}>
                <div className={styles.middleCard} onClick={this.resultClick.bind(this, '房屋数', houseHome.HouseList.houseAmount)}>
                  <InfoiconCard
                    icons={smHouseIcon}
                    titLabel={'房屋数'}
                    titCon={houseHome.HouseList ? houseHome.HouseList.houseAmount : ''}
                    iSarrow={true}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.middleCard} onClick={this.resultClick.bind(this, '房屋所属社区数', houseHome.HouseList.villageAmount)}>
                  <InfoiconCard
                    icons={smHouseIcon}
                    titLabel={'房屋所属社区数'}
                    titCon={houseHome.HouseList ? houseHome.HouseList.villageAmount : ''}
                    iSarrow={true}
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </div>
        {this.props.global.searchHouseVisible ? <SearchHighModal /> : ''}
        <ModalCard
          visible={this.state.resultVisible}
          width={868}
          titleLeft={this.state.resultLabel}
          maskClosable={true}
          onCancel={this.onCancel}
        >
          <div className={`${styles.resultContainer} ${style.scrollbar}`}>
            {this.renderResultContainer(this.state.resultLabel, houseHome.HouseList)}
          </div>
        </ModalCard>
      </div>
    );
  }
}


export default connect((state) => {
  return { ...state }
})(Total);
