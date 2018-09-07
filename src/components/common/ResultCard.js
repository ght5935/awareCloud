import React from 'react';
import { Tooltip } from 'antd'
import styles from '../../style/common/common.css';
import * as Utils from '../../utils/utils';

/**
 * @description label名称 + 内容信息
 * @param { className, titleLabel, titleCon }
 * @returns
 */

function ResultCard({ className, titleLabel, titleCon }) {

    return (
        <div className={className ? `${styles.infoCard} ${className}` : styles.infoCard}>
            <div className={styles.resultConLabel}>{titleLabel ? titleLabel : '名称'}</div>
            <div className={styles.resultConNum}>{titleCon ? titleCon : ''}</div>
        </div>
    )
}
export default ResultCard;