import React from 'react';
import styles from '../../style/common/common.css';

class UnreglarTitle extends React.Component{
componentDidMount() {
    const c = this.refs.contain.clientWidth;
    const l = this.refs.left.clientWidth;
    const lh = this.refs.left.clientHeight;
    this.refs.left.style.width = l + 10 + 'px'
    this.refs.left.style.lineHeight = lh + 'px';
    this.refs.right.style.width = c - l + 'px';
}
render(){
    return (
        <div ref="contain" className={styles.unreglarTitle}>
            <div ref="left" className={styles.unreglarTitleLeft}>{this.props.title}</div>
            <div ref="right" className={styles.unreglarTitleRight}></div>
        </div>
    )
}
}

export default UnreglarTitle;