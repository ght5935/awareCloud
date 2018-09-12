

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

import SearchModal from '../../components/car/searchModal';

import style from '../../style/common/common.css';
import styles from './index.css';

import searchIcon from '../../assets/common/search-icon.png'
import smHouseIcon from '../../assets/home/indeed-house-icon.png';
import w from '../../assets/w.jpg';
import { stat } from 'fs';
import { DEFAULT_ECDH_CURVE } from 'tls';

import * as Utils from '../../utils/utils';

const Option = Select.Option;



class Search extends React.Component {
  state = {
    resultVisible: false,
    resultLabel: ''
  }
  componentDidMount() {
    const carSearch = this.props.car.carSearch;
    const { carSearchParams } = carSearch;
    this.props.dispatch({
      type: 'car/success',
      payload: {
        plateList: this.props.global.plateList ? this.props.global.plateList : [],
        carSearch: {
          ...carSearch,
          carSearchParams: {
            ...carSearchParams,
            name: this.props.global.carSearch.carSearchParams.name,
            province: this.props.global.carSearch.carSearchParams.province,
            plate_number: this.props.global.carSearch.carSearchParams.plate_number,
            plate_type: this.props.global.carSearch.carSearchParams.plate_type,
          }
        }
      }
    })
    this.props.dispatch({
      type: 'car/getCar'
    })
  }
  componentWillUnmount() {
    console.log('%ccar清除参数', 'color:red')
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
    })
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
  renderResultContainer = (resultLabel, data) => {
    let Ele;
    let carImageDataList = data.carImageDataList ? data.carImageDataList : [];
    let villageAmountDataList = data.villageAmountDataList ? data.villageAmountDataList : [];
    switch (resultLabel) {
      case '车辆数':
        Ele = carImageDataList.map((item, idx) =>
          <Link to={`/car/info?carId=${item.carId}`} key={idx}>
            <div className={styles.resultCon1} >
              <img src={item.carImg} alt="" className={styles.resultCon1Img} />
              <InfoiconCard
                titLabel={'姓名'}
                titCon={item.name}
                iSarrow={false}
              />
              <InfoiconCard
                titLabel={'车牌号'}
                titCon={item.plateNumber}
                iSarrow={false}
              />
            </div>
          </Link>
        )
        break;
      case '车辆所属社区数':
        Ele = villageAmountDataList.map((item, idx) =>
          <div className={styles.resultCon} key={idx}>
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
    const car = this.props.car;
    const { carSearch } = car;
    const { carSearchParams } = carSearch;
    return (
      <div className={styles.car}>
        <div className={styles.carTop}>
          <Slogen type={2}>
            <Row>
              <Col span={24} className={styles.selectTop}>
                <span className={styles.title}>实有车辆</span>
                <span className={styles.title} style={{ fontSize: 15 }}>-车辆搜索</span>
              </Col>
            </Row>
            <img src={searchIcon} className={styles.titleIcon} data-id="icon_btn" onClick={this.searchModalClick} />
          </Slogen>
          <div className={styles.linkBtn}>
            <Link to='/car'>
              <div className={styles.btn}>统计信息</div>
            </Link>
          </div>
        </div>
        <div className={styles.searchLeft}>
          <Card titleLeft={'搜索条件'}>
            <Row className={styles.middleRow} gutter={20}>
              <Col span={8}>
                <InfoCard
                  titleLabel={'车牌'}
                  titleCon={`${Utils.getDataFromArr(car.provinceList, carSearchParams.province, 'province')}${carSearchParams.plate_number ? carSearchParams.plate_number : ''}`}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'车型'}
                  titleCon={Utils.getDataFromArr(car.typeList, carSearchParams.model, 'modelStr')}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'车辆品牌'}
                  titleCon={Utils.getDataFromArr(car.brandList, carSearchParams.brand, 'brand')}
                />
              </Col>
            </Row>
            <Row className={styles.middleRow} gutter={20}>
              <Col span={8}>
                <InfoCard
                  titleLabel={'车辆颜色'}
                  titleCon={Utils.getDataFromArr(car.colorsList, carSearchParams.color, 'color')}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'车主姓名'}
                  titleCon={carSearchParams.name ? carSearchParams.name : ''}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'车主手机号'}
                  titleCon={carSearchParams.phone ? carSearchParams.phone : ''}
                />
              </Col>
            </Row>
            <Row gutter={20} className={styles.middleRow}>
              <Col span={8}>
                <InfoCard
                  titleLabel={'车辆所属社区'}
                  titleCon={Utils.getDataFromArr(car.AllVillageList, carSearchParams.orgunitId, 'name')}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'标签'}
                  titleCon={Utils.getDataFromArr(car.plateList, carSearchParams.plate_type, 'plateTypeStr')}
                />
              </Col>
            </Row>
          </Card>
          <Card titleLeft={'搜索结果'}>
            <Row className={styles.middleRow} gutter={20}>
              <Col span={12}>
                <div className={styles.middleCard} onClick={this.resultClick.bind(this, '车辆数')}>
                  <InfoiconCard
                    icons={smHouseIcon}
                    titLabel={'车辆数'}
                    titCon={car.carInfoList ? car.carInfoList.carAmount : ''}
                    iSarrow={true}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.middleCard} onClick={this.resultClick.bind(this, '车辆所属社区数')}>
                  <InfoiconCard
                    icons={smHouseIcon}
                    titLabel={'车辆所属社区数'}
                    titCon={car.carInfoList ? car.carInfoList.villageAmount : ''}
                    iSarrow={true}
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </div>
        {this.props.global.searchHouseVisible ? <SearchModal /> : ''}
        <ModalCard
          visible={this.state.resultVisible}
          width={868}
          titleLeft={this.state.resultLabel}
          maskClosable={true}
          onCancel={this.onCancel}
        >
          <div className={`${styles.resultContainer} ${style.scrollbar}`}>
            {this.renderResultContainer(this.state.resultLabel, car.carInfoList)}
          </div>
        </ModalCard>
      </div>
    );
  }
}


export default connect((state) => {
  return { ...state }
})(Search);
