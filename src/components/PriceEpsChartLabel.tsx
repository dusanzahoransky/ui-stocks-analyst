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

export class PriceEpsChartLabel extends React.Component<PriceEpsChartLabelProps> {

    render() {
        const {x, y, stroke, value} = this.props;

        let label = value ? value.toFixed(1) : ''
        // if (value) {
        //     let priceEps = data[index]
        //     const epsQuarterly = data.filter(d => d ? d.epsQuarterly : undefined);
        //     let lastEps = epsQuarterly.length > 0 ? epsQuarterly.pop().epsQuarterly : undefined;
        //     let diff = `${(value - priceEps.price).toFixed(1)}`;
        //     //only print diff with current value for the last eps, buggy if 2 eps are the same
        //     if (lastEps === value) {
        //         let currentPriceEps = data[data.length - 1]
        //         let diffCurrent = `${(value - currentPriceEps.price).toFixed(1)}`;
        //         label = `diff: ${diff}, diff current: ${diffCurrent}`
        //     } else {
        //         label = `diff: ${diff}`
        //     }
        // }
        // const xOffset = label? - (label.length + 5) : 0;    //move it to the left so the whole label is displayed at the end of the chart
        return <text x={x} y={y} dy={-8} dx={0} fill={stroke} fontSize={10} textAnchor="middle">{label}</text>
    }
}

