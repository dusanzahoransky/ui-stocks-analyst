import React from "react";
import {PriceEpsData} from "../model/PriceEpsData";

export interface PriceEpsChartLabelProps {
    data: PriceEpsData[];
    x?: number,
    y?: number,
    stroke?: string,
    value?: number,
    index?: number
}

export class PEChartLabel extends React.Component<PriceEpsChartLabelProps> {
    render() {
        const {x, y, stroke, value} = this.props;
        const label = value? value.toFixed(2) : ''
        const xOffset = label? - (label.length + 5) : 0;    //move it to the left so the whole label is displayed at the end of the chart
        return <text x={x} y={y} dy={-8} dx={xOffset} fill={stroke} fontSize={10} textAnchor="middle">{label}</text>
    }
}

