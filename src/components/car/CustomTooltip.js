
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

class CustomTooltip extends React.Component {
    getIntroOfPage(payload) {
        if(payload){
            return payload.map(v => (
                <p>{`${v.name === 'parkingIsFree' ? '空闲车位' : '使用车位'} : ${v.value}`}</p>
            ))
        }
    }
    getLabel(payload,label) {
        let value;
        if(payload){
            payload.map(v => {
                value += v.value
            })
            return `${label} : ${value}`
        }
    }
    render() {
        const { active } = this.props;
        if (active) {
            const { payload, label } = this.props;
            return (
                <div className="custom-tooltip" style={{ color: '#ccc' }}>
                    <p>{this.getIntroOfPage(payload, label)}</p>
                    <p className="intro">{this.getIntroOfPage(payload, label)}</p>
                </div>
            );
        }
        return null;
    }
}

export default CustomTooltip;