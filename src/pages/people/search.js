

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

import SearchHighModal from '../../components/people/searchHighModal';
import style from '../../style/common/common.css';
import styles from './index.css';

import searchIcon from '../../assets/common/search-icon.png'
import smPersonIcon from '../../assets/home/indeed-entry-icon.png';
import smHouseIcon from '../../assets/home/indeed-house-icon.png';
import smCarIcon from '../../assets/home/indeed-car-icon.png';

import * as Conf from '../../utils/config';
import * as Utils from '../../utils/utils';

function docClick(_this, e) {
  const path = e.path;
  let flag = true;
  path.map(v => {
    try {
      if (typeof v.getAttribute == 'function') {
        if (v.getAttribute('data-id') === 'icon_btn') {
          flag = false
        }
      }
    } catch (e) {
      throw (e)
    }
  })
  const dataId = e.target.getAttribute("data-id")
  if (dataId === 'icon_btn' || !flag) {
    return false;
  }
  window.g_app._store.dispatch({
    type: 'people/success',
    payload: {
      // searchVisible: false
    }
  })
}

class SearchResult extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      resultLabel: '',
      resultVisible: false,
      renderResult: false,
      renderResultData: {
        personTotalData: {
          personDetailData: ''
        }
      }
    }
  }

  componentDidMount() {


    var _this = this;
    // document.addEventListener('click', docClick.bind(this, _this));
    const totalSearchParams = this.props.people.totalSearchParams
    window.g_app._store.dispatch({
      type: 'people/success',
      payload: {
        allTag: this.props.global.allTag,
        totalSearchParams: {
          ...totalSearchParams,
          idCard: this.props.global.peopleSearch.idCard,
          tag: this.props.global.peopleSearch.tag,
          name: this.props.global.peopleSearch.name,
        }
      }
    })
    window.g_app._store.dispatch({
      type: 'people/getMapSearch'
    });
  }
  componentWillUnmount() {
    var _this = this;
    document.removeEventListener('click', docClick.bind(this, _this))
    console.log('%cpeople清除参数', 'color:red')
    const totalSearchParams = this.props.people.totalSearchParams
    window.g_app._store.dispatch({
      type: 'people/success',
      payload: {
        allTag: this.props.global.allTag,
        totalSearchParams: {
          ...totalSearchParams,
          name: '',
          idCard: '',
          gender: '',
          nation: '',
          tag: '',
          partisanId: '',
          phone: '',
          nation: '',
          carCount: '',
          partisanId: '',
          marital_status: '',
          census: '',
          orgunitId: ''
        }
      }
    })

    this.props.dispatch({
      type: 'global/success',
      payload: {
        peopleSearch: {
          ...this.props.global.peopleSearch,
          tag: '',
          idCard: '',
          name: ''
        },
        searchHouseVisible: false
      }
    })
  }
  searchModalClick = () => {
    window.g_app._store.dispatch({
      type: 'global/success',
      payload: {
        searchHouseVisible: !this.props.global.searchHouseVisible,
      }
    });
  };
  resultClick = (name) => {
    this.setState({
      resultVisible: true,
      resultLabel: name
    })
  }
  onSelectModal = (id) => {
    const data = this.props.people.searchResult
    let personOrgData = data.personOrgData && data.personOrgData.orgData ? data.personOrgData.orgData : []
    personOrgData.map(v => {
      if (v.id == id) {
        this.setState({
          renderResultData: {
            personTotalData: {
              personDetailData: v.personDetailData
            }
          }

        })
      }
    })
    this.setState({
      resultLabel: '人员总数',
      renderResult: true
    })
  }
  renderResultContainer = (resultLabel, data) => {
    let Ele = '';
    let personTotalData = data && data.personTotalData && data.personTotalData.personDetailData ? data.personTotalData.personDetailData : []
    let personOrgData = data && data.personOrgData && data.personOrgData.orgData ? data.personOrgData.orgData : []
    let personCarData = data && data.personCarData && data.personCarData.personCarData ? data.personCarData.personCarData : [];
    switch (resultLabel) {
      case '人员总数':
        Ele = personTotalData.map((item, idx) =>
          <Link to={`/people/info?personId=${item.id}`} key={idx}>
            <div className={styles.resultCon1} >
              <div ref={`assetsImgContain${idx}`} className={styles.resultCon1Img} >
                <img onLoad={Utils.handleImg(this.refs[`assetsImg${idx}`], this.refs[`assetsImgContain${idx}`])} ref={`assetsImg${idx}`} src={item.img && item.img.length > 0 ? item.img[0] : ''} alt="" />
              </div>
              <InfoiconCard
                className={styles.resultInfoiconCard}
                titLabel={'姓名'}
                titCon={item.name}
                iSarrow={false}
              />
              <InfoiconCard
                className={styles.resultInfoiconCard}
                titLabel={'身份证号'}
                titCon={item.identityCard}
                iSarrow={false}
              />
            </div>
          </Link>
        )
        break;
      case '人员所属社区数':
        Ele = personOrgData.map((item, idx) =>
          <div className={styles.resultCon} key={idx} onClick={this.onSelectModal.bind(this, item.id)}>
            <ResultCard
              titleLabel={item.name}
              titleCon={item.personDetailData&&item.personDetailData.length>0?item.personDetailData.length:''}
            />
          </div>)
        break;
      case '人员拥有车辆数':
        Ele = personCarData.map((item, idx) =>
          <Link to={`/car/info?carId=${item.carData.id}`} key={idx}>
            <div className={styles.resultCon2}>
              <img src={item.carData && item.carData && item.carData.img && item.carData.img.length > 0 ? item.carData.img[0] : ''}
                alt=""
                className={styles.resultCon2Img}
              />
              <InfoiconCard
                titLabel={'姓名'}
                titCon={item.personData && item.personData.name ? item.personData.name : ''}
                iSarrow={false}
              />
              <InfoiconCard
                titLabel={'车牌号'}
                titCon={item.carData && item.carData.plateNumber ? `${item.carData.abbreviation}${item.carData.plateNumber}` : ''}
                iSarrow={false}
              />
            </div>
          </Link>
        )
        break;
      default:
        Ele = '';
    }
    return Ele
  }
  onCancel = () => {
    this.setState({
      resultVisible: false,
      renderResult: false
    });
  }
  render() {

    return (
      <div className={styles.people}>
        <div className={styles.peopleTop}>
          <Slogen type={2}>
            <Row>
              <Col span={24} className={styles.selectTop}>
                <span className={styles.title}>实有人口</span>
                <span className={styles.title} style={{ fontSize: 15 }}>-人口搜索</span>
              </Col>
            </Row>
            <img
              src={searchIcon}
              className={styles.titleIcon}
              data-id="icon_btn"
              onClick={this.searchModalClick}
              alt=""
            />
          </Slogen>
          <div className={styles.linkBtn}>
            <Link to='/people'>
              <div className={styles.btn}>统计信息</div>
            </Link>
          </div>
        </div>
        <div className={styles.indexLeft}>
          <Card titleLeft={'搜索条件'}>
            <Row className={styles.middleRow} gutter={20}>
              <Col span={8}>
                <InfoCard
                  titleLabel={'姓名'}
                  titleCon={this.props.people.totalSearchParams.name}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'身份证号'}
                  titleCon={this.props.people.totalSearchParams.idCard}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'性别'}
                  titleCon={Conf.GENDER[this.props.people.totalSearchParams.gender]}
                />
              </Col>
            </Row>
            <Row className={styles.middleRow} gutter={20}>
              <Col span={8}>
                <InfoCard
                  titleLabel={'手机号码'}
                  titleCon={this.props.people.totalSearchParams.phone}
                />
              </Col>

              <Col span={8}>
                <InfoCard
                  titleLabel={'民族'}
                  titleCon={Utils.getDataFromArr(this.props.people.allNation, this.props.people.totalSearchParams.nation, 'name')}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'户籍'}
                  titleCon={Conf.CENDSUS[this.props.people.totalSearchParams.census]}
                />
              </Col>
            </Row>
            <Row gutter={10} className={styles.middleRow}>
              <Col span={8}>
                <InfoCard
                  titleLabel={'婚姻状况'}
                  titleCon={Conf.MARITAL_STATUS[this.props.people.totalSearchParams.marital_status]}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'党派'}
                  titleCon={Utils.getDataFromArr(this.props.people.allPartisan, this.props.people.totalSearchParams.partisanId, 'name')}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'所属社区'}
                  titleCon={Utils.getDataFromArr(this.props.people.allVillage, this.props.people.totalSearchParams.orgunitId, 'name')}
                />
              </Col>
            </Row>
            <Row gutter={10}>
              <Col span={8}>
                <InfoCard
                  titleLabel={'拥有车辆数'}
                  titleCon={this.props.people.totalSearchParams.carCount <= 2 ? this.props.people.totalSearchParams.carCount : '>2'}
                />
              </Col>
              <Col span={8}>
                <InfoCard
                  titleLabel={'标签'}
                  titleCon={Utils.getDataFromArr(this.props.people.allTag, this.props.people.totalSearchParams.tag, 'name')}
                />
              </Col>
            </Row>
          </Card>
          <Card titleLeft={'搜索结果'}>
            <Row className={styles.middleRow} gutter={20}>
              <Col span={12}>
                <div className={styles.middleCard} onClick={this.resultClick.bind(this, '人员总数')}>
                  <InfoiconCard
                    icons={smPersonIcon}
                    titLabel={'人员总数'}
                    titCon={this.props.people.searchResult && this.props.people.searchResult.personTotalData ? this.props.people.searchResult.personTotalData.total : 0}
                    iSarrow={true}
                  />
                </div>
              </Col>
              <Col span={12}>
                <div className={styles.middleCard} onClick={this.resultClick.bind(this, '人员所属社区数')}>
                  <InfoiconCard
                    icons={smHouseIcon}
                    titLabel={'人员所属社区数'}
                    titCon={this.props.people.searchResult && this.props.people.searchResult.personOrgData ? this.props.people.searchResult.personOrgData.total : 0}
                    iSarrow={true}
                  />
                </div>
              </Col>
            </Row>
            <Row className={styles.middleRow} gutter={20}>
              <Col span={12}>
                <div className={styles.middleCard} onClick={this.resultClick.bind(this, '人员拥有车辆数')}>
                  <InfoiconCard
                    icons={smCarIcon}
                    titLabel={'人员拥有车辆数'}
                    titCon={this.props.people.searchResult && this.props.people.searchResult.personCarData ? this.props.people.searchResult.personCarData.total : 0}
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
          <div className={`${styles.resultContainer} ${style.scrollbar}`} ref="modalContent">
            {
              this.state.renderResult ? this.renderResultContainer(this.state.resultLabel, this.state.renderResultData) :
                this.renderResultContainer(this.state.resultLabel, this.props.people.searchResult)
            }
          </div>
        </ModalCard>
      </div>
    );
  }
}


export default connect((state) => {
  return { ...state }
})(SearchResult);
