
import React from 'react';
import styles from '../../style/common/common.css';
import processImg from '../../assets/common/process.png';
/**
 * @description label名称 + 统计信息
 * @param { className, totalLabel, totalCon }
 * @returns
 */

function TotalCard({ className, totalLabel, totalCon }) {

    return (
        <div className={className ? `${styles.totalCard} ${className}` : styles.totalCard}>
            <span className={styles.totalLabel}> {totalLabel ? totalLabel : '名称'} </span>
            <img className={styles.totalImg} src={processImg} alt=""/>
            <span className={styles.totalCon}> {totalCon ? totalCon : '0'} </span>
        </div>
    )
}
export default TotalCard;