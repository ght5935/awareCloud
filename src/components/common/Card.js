
import React from 'react';
import propTypes from 'prop-types';
import styles from '../../style/common/common.css';
import classNames from 'classnames/bind';

/**
 * @description 卡片背景 + 标题
 * @param { className, titleLeft, titleRight, children }
 * @returns Card组件
 */
Card.propTypes = {
    className: propTypes.string,
    titleLeft: propTypes.string.isRequired,
    titleRight:propTypes.oneOfType([
        propTypes.string,
        propTypes.number
    ]),
    children: propTypes.oneOfType([
        propTypes.element,
        propTypes.array
    ])
}
function Card({ className, titleLeft, titleRight, children }){
    const cn = classNames.bind(styles);
    const card = cn({
        card: !className,
        cardBg: true,
    }); 
    return (
        <div className={ className ? `${card} ${className}` : card }>
            <div className={styles.cardTitle}>
                <div className={styles.titleLeft}>{titleLeft ? titleLeft : 'titleLeft'}</div>
                <div className={styles.titleRight}>{titleRight ? titleRight : ''}</div>
            </div>
            <div className={styles.cardContent}>
            {children}
            </div>
            
        </div>
    )
}



export default Card;