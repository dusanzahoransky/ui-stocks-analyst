import React, {ReactNode} from "react";
import {CartesianGrid, Line, LineChart, Tooltip, YAxis} from 'recharts';
import "./RatioChart.css"
import {RatioChartData} from "../model/RatioChartData";
import {FormattingUtils} from "../utils/FormattingUtils";
import {RatioChartLabel} from "./RatioChartLabel";

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
                <h3 className={'RatioChartLabel'}>{chartLabel}</h3>
                <div className={'ChartWrapper'}>
                    <LineChart width={800} height={140} data={normalisedData} >
                        <CartesianGrid strokeDasharray="2 2" y={0} vertical={false}/>
                        <Line type="monotone" dataKey="value" stroke="#003795" legendType={"plainline"}
                              isAnimationActive={false} label={<RatioChartLabel/>}/>
                        {/*                    <Line type="monotone" dataKey="epsQuarterly" stroke="#128408" connectNulls={true}
                          label={<RatioChartLabel data={data}/>} isAnimationActive={false}/>*/}
                        {/*<XAxis dataKey="date" tickSize={1} tick={{fontSize: 8}} height={8} />*/}
                        <YAxis tick={{fontSize: 10}} width={50} type="number" domain={[0, 'auto']} minTickGap={0} tickCount={5} scale={"linear"}
                               tickFormatter={RatioChart.yAxisFormatter()}/>
                        <Tooltip/>
                    </LineChart>
                </div>
            </div>
        )
    }

    private static yAxisFormatter() {
        return (n) => {
            return n && typeof n === 'number' ? n.toFixed(0) : n;
        }
    }
}