import React from "react";
import {Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import "./IndicesPriceChart.css"
import {IndicesChartData} from "../model/IndicesChartData";

export interface IndicesPriceChartProps {
    data: IndicesChartData[];
    symbols: string[];
    label?: string;
    description?: string;
}

export class IndicesPriceChart extends React.Component<IndicesPriceChartProps> {

    render() {
        const {data, label, description} = this.props;
        const chartLabel = label ? <h3>{label}</h3> : ''
        const chartDescription = description ? <p>{description}</p> : ''
        const lines = this.props.symbols.map(s => {
            return <Line key={s} type="monotone" dataKey={s} stroke="#003795" dot={false} legendType={"plainline"}/>
        })
        return (
            <div className={'IndicesPriceChart'}>
                {chartLabel}
                {chartDescription}
                <LineChart width={1800} height={400} data={data}>
                    {lines}
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                </LineChart>
            </div>
        )
    }
}