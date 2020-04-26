import React from "react";
import {PriceEpsChartProps} from "./PriceEps";
import {PriceEpsData} from "../model/PriceEpsData";

export interface PriceEpsChartLabelProps {
    data: PriceEpsData[];
    x?: number,
    y?: number,
    stroke?: string,
    value?: number,
    index?: number
}

export interface PriceEpsChartLabelState {
}


export class PriceEpsChartLabel extends React.Component<PriceEpsChartLabelProps, PriceEpsChartLabelState> {

    constructor(props: Readonly<PriceEpsChartLabelProps>) {
        super(props);
    }

    render() {
        // @ts-ignore
        const {x, y, stroke, value, index, data} = this.props;

        let label
        if(value) {
            let priceEps = data[index]
            let lastEps = data.filter(d => d.eps).pop().eps;
            let diff = `${(priceEps.price - value).toFixed(1)}`;
            //only print diff with current value for the last eps, buggy if 2 eps are the same
            if(lastEps == value) {
                let currentPriceEps = data[data.length - 1]
                let diffCurrent = `${(currentPriceEps.price - value).toFixed(1)}`;
                label = `diff: ${diff}, diff current: ${diffCurrent}`
            } else{
                label = `diff: ${diff}`
            }
        }
        return <text x={x} y={y} dy={-8} fill={stroke} fontSize={10} textAnchor="middle">{label}</text>
    }
}

