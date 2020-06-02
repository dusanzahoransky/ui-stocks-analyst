import React from "react";
import {Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import "./RatioChart.css"
import {RatioChartData} from "../model/RatioChartData";
import {FormattingUtils} from "../utils/FormattingUtils";

export interface RatioChartProps {
    data: RatioChartData[];
    label: string;
}

export class RatioChart extends React.Component<RatioChartProps> {

    render() {
        const {data, label} = this.props;
        let firstValue = data.map(d => d.value).filter(value => !Number.isNaN(value))[0];
        const scaleFactor = FormattingUtils.scaleFactor(firstValue)
        const scaleFactorLabel = FormattingUtils.scaleFactorLabel(firstValue)
        const chartLabel = `${label} ${scaleFactorLabel ? 'in ' + scaleFactorLabel : ''}`

        let normalisedData = data.map(d => {
            return {
                date: d.date,
                value: d.value / scaleFactor
            }
        });
        return (
            <div className={'RatioChart'}>
                <h3>{chartLabel}</h3>
                <div className={'ChartWrapper'}>
                    <LineChart width={800} height={100} data={normalisedData}>
                        <Line type="monotone" dataKey="value" stroke="#003795" legendType={"plainline"}
                              isAnimationActive={false}/>
                        {/*                    <Line type="monotone" dataKey="epsQuarterly" stroke="#128408" connectNulls={true}
                          label={<RatioChartLabel data={data}/>} isAnimationActive={false}/>*/}
                        {/*<XAxis dataKey="date" tickSize={3} tick={{fontSize: 10}} height={10}/>*/}
                        <YAxis tick={{fontSize: 10}} width={20}/>
                        <Tooltip/>
                    </LineChart>
                </div>
            </div>
        )
    }
}