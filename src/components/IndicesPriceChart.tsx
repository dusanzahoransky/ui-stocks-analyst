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
        const lines = this.props.symbols.map( (s, index ) => {
            return <Line key={s} type="monotone" dataKey={s} stroke={this.getColorForIndex(index)} dot={false} legendType={"plainline"}
                         isAnimationActive={false} connectNulls={true}/>
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

    getColorForIndex(index: number) {
        switch (index % 10) {
            case 0: return '#0000FF'
            case 1: return '#008000'
            case 2: return '#FF0000'
            case 3: return '#000080'
            case 4: return '#008080'
            case 5: return '#FFFF00'
            case 6: return '#800000'
            case 7: return '#008080'
            case 8: return '#00FFFF'
            case 9: return '#FF00FF'
        }
    }

}