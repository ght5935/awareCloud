
import React from 'react';
import { Tooltip } from 'antd'
import styles from '../../style/common/common.css';
import * as Utils from '../../utils/utils';

import lineImg from '../../assets/home/Line01.png';
/**
 * @description icons图标 + label名称 + titCon统计信息 +iSarrow是否存在
 * @param { className, icons, titLabel, titCon, iSarrow }
 * @returns
 */

function InfoiconCard({ className, icons, titLabel, titCon, iSarrow }) {
    let marginLeft;
    let fontSize;
    if (icons) {
        marginLeft = 28
        fontSize = 18
    } else {
        marginLeft = 0
        fontSize = 15
    }

    return (
        <div className={className ? `${styles.InfoiconCard} ${className}` : styles.InfoiconCard}>
            <div>
                {icons ? <img className={styles.titicons} src={icons} alt="" /> : ''}
                <span className={styles.titLabel}> {titLabel ? titLabel : '名称'} </span>
            </div>
            <img className={styles.line} src={lineImg} style={{ marginLeft: marginLeft }} alt="" />
            <div className={styles.titCon} style={{ marginLeft: marginLeft, fontSize: fontSize, 'WebkitBoxOrient': 'vertical' }}> {titCon ? titCon : '0'} </div>
            {iSarrow ? <div className={iSarrow ? styles.arrow : styles.arrowNone}>></div> : ''}
        </div>
    )
}
export default InfoiconCard;