import React from "react";
import {Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {PriceEpsData} from "../model/PriceEpsData";
import {PriceEpsChartLabel} from "./PriceEpsChartLabel";
import "./PriceEpsChart.css"

export interface PriceEpsChartProps {
    data: PriceEpsData[];
    label?: string;
    description?: string;
}

export class PriceEpsChart extends React.Component<PriceEpsChartProps> {

    render() {
        const {data, label, description} = this.props;
        const chartLabel = label? <h3>{label}</h3> : ''
        const chartDescription = description? <p>{description}</p>: ''
        return (
            <div className={'PriceEpsChart'}>
                {chartLabel}
                {chartDescription}
                <LineChart width={1800} height={400} data={this.props.data}>
                    <Line type="monotone" dataKey="price" stroke="#003795" dot={false} legendType={"plainline"}
                          isAnimationActive={false}/>
                    <Line type="monotone" dataKey="eps" stroke="#128408" connectNulls={true}
                          label={<PriceEpsChartLabel data={data}/>} isAnimationActive={false}/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                </LineChart>
            </div>
        )
    }
}