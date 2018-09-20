
import React from 'react';
import _ from 'lodash';
import { Row, Col, Carousel } from 'antd';

import styles from '../../style/common/common.css';
class Loop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    shouldComponentUpdate(nextProps, nextState) {
        // if (_.isEqual(this.props.dataList, nextProps.dataList) || !_.isEmpty(this.props)) {
        //     return false
        // } else {
        //     return true
        // }
        if (_.isEqual(this.props.dataList, nextProps.dataList)) {
            return false
        } else {
            return true
        }
    }
    render() {
        return (
            <Carousel
                autoplay
                vertical
                dots={false}
            >
                {this.props.children}
            </Carousel>
        )
    }
}

export default Loop;