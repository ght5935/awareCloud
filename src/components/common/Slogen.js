import router from 'umi/router';
import propTypes from 'prop-types';
import title from '../../assets/common/title.png';
import styles from '../../style/common/common.css';
import exitBg from '../../assets/common/exit.png';
import Redirect from 'umi/redirect';

import * as Conf from '../../utils/config';

/**
 * @description 页头公共组件
 * @author Jason Cui
 * @param type: 底部展示类型，取值范围（0， 1， 2）
 * @param children: 底部内部元素
 * @returns Slogen组件
 */

Slogen.propTypes = {
    type: propTypes.oneOf([0, 1, 2]).isRequired,
    children: propTypes.oneOfType([
        propTypes.array,
        propTypes.element
    ]).isRequired
}
function linkToIndex(){
    router.replace('/')
}
function returnToLogin(){
    window.location.href = `${Conf.API_PREFIX}/admin/home.do#/login`;
    // window.location.href = `localhost:9090/#/login`;

}

function Slogen({type, children}){
    return (
        <div className={styles.slogTitle} >
          <div className={styles.slogContent}>
            <img src={title} style={{ width: '100%', cursor: 'pointer' }} alt="" onClick={linkToIndex} />
            {/* <img src={title01} style={{ width: '60%' }} alt="" /> */}
            <div onClick={returnToLogin} className={styles.exit}>  退出</div>
            {renderFooter(type, children)}
          </div>
        </div>
    )
}

function Footer01({children}){
    return (
        <div className={styles.slogFooter01}>
        {children}
        </div>
    )
}
function Footer02({children}){
    return (
        <div className={styles.slogFooter02}>
        {children}
        </div>
    )
}
function Footer03({children}){
    return (
        <div className={styles.slogFooter03}>
        {children}
        </div>
    )
}

function renderFooter(type, children){
    let rt = '';
    switch(type){
        case 0: 
            rt = <Footer01 children={children}/>;
            break;
        case 1: 
            rt = <Footer02 children={children}/>;
            break;
        case 2: 
            rt = <Footer03 children={children}/>;
            break;
        default:
            rt = <Footer01 children={children}/>        

    }
    return rt;
}

export default Slogen;