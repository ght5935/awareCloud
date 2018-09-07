import React from 'react';
import { Modal } from 'antd';
import Card from "./Card";


/**
 * @author Jason Cui
 * @param width：弹窗的宽度
 * @param onCancel: 关闭弹窗
 * @param titleLeft: 左侧标题
 * @param titleRight: 右侧标题
 * @param children: 组件内容
 *
 */
class ModalCard extends React.Component {
    render() {
        return (
            <Modal 
                visible={this.props.visible} 
                footer={null} 
                closable={false} 
                keyboard={true}
                centered
                onCancel={this.props.onCancel}
                width={this.props.width}
                >
                <Card titleLeft={this.props.titleLeft} titleRight={this.props.titleRight} >
                    {this.props.children}
                </Card>
            </Modal>
        )
    }
}

export default ModalCard;