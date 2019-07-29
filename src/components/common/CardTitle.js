
import React from 'react';
import propTypes from 'prop-types';
import styles from '../../style/common/common.css';
import classNames from 'classnames/bind';

/**
 * @description 卡片背景 + 标题
 * @param { className, titleCenter, children }
 * @returns Card组件
 */
CardTitle.propTypes = {
    className: propTypes.string,
    titleCenter: propTypes.string.isRequired,
    children: propTypes.oneOfType([
        propTypes.element,
        propTypes.array
    ])
}
function CardTitle({ className, titleCenter, children }){
    const cn = classNames.bind(styles);
    const card = cn({
        card: true,
        cardBg: true,
    }); 
    return (
        <div className={ className ? `${card} ${className}` : card }>
            <div className={styles.cardTitle}>
                <div className={styles.titleCenter}>{titleCenter ? titleCenter : 'titleCenter'}</div>
            </div>
            <div className={styles.cardContent}>
            {children}
            </div>
            
        </div>
    )
}



export default CardTitle;