
import React from 'react';
import { Tooltip } from 'antd'
import styles from '../../style/common/common.css';
import * as Utils from '../../utils/utils';

/**
 * @description label名称 + 内容信息
 * @param { className, titleLabel, titleCon }
 * @returns
 */

function InfoCard({ className, titleLabel, titleCon }) {
 
    return (
        <div className= {className ? `${styles.infoCard} ${className}` : styles.infoCard}>
            <div className={styles.titleLabel}>{titleLabel ? titleLabel : '名称'}</div>
                <div className={styles.titleCon} title={titleCon ? titleCon : ''}>{titleCon ? titleCon : titleCon === 0 ? 0 : ''}</div>
        </div>
    )
}
export default InfoCard;