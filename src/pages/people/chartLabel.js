
import React, { Children } from 'react';
import propTypes from 'prop-types';

import styles from '../../style/common/common.css';
import style from './index.css';
import lineImg from '../../assets/home/Line01.png';

/**
 * @description  label名称 + titCon统计信息 
 * @param { className, icons, titLabel, titCon }
 * @returns
 */
ChartLabel.propTypes = {
    children: propTypes.oneOfType([
        propTypes.element,
        propTypes.array
    ])
}

function ChartLabel({ children,titLabel, titCon }) {

    return (
        <div className={style.chartLabel}>
            <div>
                {children}
                <span className={style.chartTxt}> {titLabel ? titLabel : '名称'} </span>
            </div>
            <img className={styles.line} src={lineImg} alt=""/>
            <div className={style.chartCon}> {titCon ? titCon : ''} </div>
        </div>
    )
}
export default ChartLabel;