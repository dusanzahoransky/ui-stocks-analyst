import React from "react";

export interface RatioChartLabelProps {
    x?: number,
    y?: number,
    stroke?: string,
    value?: number,
    index?: number
}

export class RatioChartLabel extends React.Component<RatioChartLabelProps> {
    render() {
        const {stroke, value} = this.props;
        const label = value ? value.toFixed(1) : ''
        return <text fill={stroke} fontSize={10} textAnchor="middle">{label}</text>
    }
}

