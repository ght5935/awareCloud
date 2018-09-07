
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
    titleRight: propTypes.string,
    children: propTypes.oneOfType([
        propTypes.element,
        propTypes.array
    ])
}
function Card({ className, titleLeft, titleRight,onTabClick, children, tabIndex }){
    const cn = classNames.bind(styles);
    const card = cn({
        card: !className,
        cardBg: true,
    });
    function onLeftTabClick(){
        onTabClick(0)
        
    } 
    function onRightTabClick(){ 
        onTabClick(1)
    }
    return (
        <div className={ className ? `${card} ${className}` : card }>
            <div className={styles.cardTitle}>
                <div onClick={onLeftTabClick} style={{ cursor: 'pointer'}} className={`${styles.titleLeft} ${tabIndex === 1 ? styles.titleNoLeft: ''}`}>{titleLeft ? titleLeft : 'titleLeft'}</div>
                <div onClick={onRightTabClick} style={{cursor: 'pointer'}} className={`${tabIndex === 1 ? `${styles.titleNoRight}` : `${styles.titleRight}`}`}>{titleRight ? titleRight : ''}</div>
            </div>
            <div className={styles.cardContent}>
            {children}
            </div>
            
        </div>
    )
}



export default Card;