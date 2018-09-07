

import React from 'react';
import propTypes from 'prop-types';
import { Tooltip } from 'antd'
import styles from '../../style/common/common.css';
import * as Utils from '../../utils/utils';

import processImg from '../../assets/common/process.png';
/**
 * @description   lefttxt + children
 * @param { className, leftTxt, children }
 *  leftTxt: bool
 * @returns
 */
QueryCard.propTypes = {
    className: propTypes.string,
    leftTxt: propTypes.string,
    children: propTypes.oneOfType([
        propTypes.element,
        propTypes.array
    ])
}

function QueryCard({ className, leftTxt, children }) {

    return (
        <div className={className ? `${styles.queryCard} ${className}` : styles.queryCard}>
            <div className={styles.queryLeft}>
                {  
                   leftTxt ? <span className={styles.queryLeftTxt}>{leftTxt}</span> : ''
                }
            </div>
            <div className={styles.queryCenter}>{children}</div>
            <div className={styles.queryRight}></div>
        </div>
    )
}

export default QueryCard;