import React from "react";
import {Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import {PriceEpsData} from "../model/PriceEpsData";
import {PriceEpsChartLabel} from "./PriceEpsChartLabel";

export interface PriceEpsChartProps {
    data: PriceEpsData[];
}

export class PriceEpsChart extends React.Component<PriceEpsChartProps> {

    render() {
        let chartData = this.props.data;
        return (
            <div className={'PriceEpsChartChart'}>
                <LineChart width={1800} height={400} data={this.props.data}>
                    <Line type="monotone" dataKey="price" stroke="#8884d8"/>
                    <Line type="monotone" dataKey="eps" stroke="#82ca9d" connectNulls={true}
                          label={<PriceEpsChartLabel data={chartData}/>}/>
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                </LineChart>
            </div>
        )
    }
}