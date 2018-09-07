import React from 'react';
import styles from '../../style/common/common.css'; 
import { version } from 'moment';

function handleDegree(index) {
    return 360 / index
}
class Circle extends React.Component{
    onImgsClick = (key) => {
        this.props.imgClick(key)
    }
    isOpacityFull = (key, imgSrcs) => {
        let rt = {transition: 'transform .1s',transform: `rotate(-${handleDegree(imgSrcs.length) * key}deg)`,}
        if(this.props.selectedKey === key){
            rt.transform = rt.transform + ' scale(1.2)';
            rt.opacity = 1
            return rt;
        }else{
            return rt
        }
    }

render() {
    const { imgSrcs }  = this.props;
    return (
        <div className={styles.circle}>
            {imgSrcs && imgSrcs.length > 0 ? imgSrcs.map((v, i) =>
                <div className={styles.circleRotateBlock} key={v} style={{ transform: `rotate(${handleDegree(imgSrcs.length) * i}deg)` }}>
                    <img onClick={this.onImgsClick.bind(null, i)} 
                    key={v} 
                    src={v} 
                    className={styles.circleImgs} 
                    style={{ ...this.isOpacityFull(i, imgSrcs)}} alt="" />
                </div>
            ) : ''}
        </div>
    )
}

}

export default Circle;