import React from "react";
import {Legend, Line, LineChart, Tooltip, XAxis, YAxis} from 'recharts';
import "./EtfsPriceChart.css"
import {EtfsChartData} from "../model/EtfsChartData";

export interface EtfsPriceChartProps {
    data: EtfsChartData[];
    symbols: string[];
    label?: string;
    description?: string;
}

export interface EtfsPriceChartState {
    /**
     * A singe symbol latest price will be chosen and all other symbols, all prices will be multiplied by a constant number,so their latest price will match the chosen symbol latest price. Which will allow timelineGrowth over the time comparison.
     */
    consolidatePrice?: boolean
}

export class EtfsPriceChart extends React.Component<EtfsPriceChartProps, EtfsPriceChartState> {

    constructor(props: Readonly<EtfsPriceChartProps>) {
        super(props);
        this.state = {
            consolidatePrice: false
        }
    }

    render() {
        const {data, label, description} = this.props;
        const chartLabel = label ? <h3>{label}</h3> : ''
        const chartDescription = description ? <p>{description}</p> : ''
        const lines = this.props.symbols.map((s, index) => {
            return <Line key={s} type="monotone" dataKey={s} stroke={this.getColorForEtf(index)} dot={false}
                         legendType={"plainline"}
                         isAnimationActive={false} connectNulls={true}/>
        })
        const chartData = this.state.consolidatePrice ? this.consolidatePrice(data) : data

        let consolidatePriceCheckbox = <>Consolidate to latest price: <input
            name="consolidatePrice"
            type="checkbox"
            checked={this.state.consolidatePrice}
            onChange={this.onConsolidatePriceClickHandler}/></>;
        return (
            <div className={'EtfsPriceChart'}>
                {chartLabel}
                {chartDescription}
                {consolidatePriceCheckbox}
                <LineChart width={1860} height={400} data={chartData}>
                    {lines}
                    <XAxis dataKey="date" tick={{fontSize: 10}}/>
                    <YAxis  tick={{fontSize: 10}} width={20}/>
                    <Tooltip/>
                    <Legend/>
                </LineChart>
            </div>
        )
    }


    /**
     * Consolidate price to the latest price point of all rendered etfs, in order to see from what initial value would they achieve the same end result - the current price
     */
    private consolidatePrice(data: EtfsChartData[]) {
        let symbols = this.props.symbols;
        if (symbols.length < 2) {
            return data
        }

        const latestPrices = symbols.map((symbol) => {
            return data.map(data => data[symbol])
                .filter(price => !!price)
                .slice(-1)[0]
        }) as number[]
        const multipliers = latestPrices.map((price, index) => {
            return latestPrices[0] / price
        })

        let consolidated = [...data]
        for (let i = 1; i < symbols.length; i++) {
            const symbol = symbols[i]
            const multiplier = multipliers[i]
            consolidated = consolidated.map(data => {
                const copy = {...data}
                if (copy[symbol]) {
                    copy[symbol] = copy[symbol] as number * multiplier
                }
                return copy
            })
        }
        return consolidated
    }

    onConsolidatePriceClickHandler = (event) => {
        const target = event.target;
        const value = target.name === 'consolidatePrice' ? target.checked : this.state.consolidatePrice;
        this.setState({consolidatePrice: value})
    }

    getColorForEtf(index: number) {
        switch (index % 10) {
            case 0:
                return '#0000FF'
            case 1:
                return '#008000'
            case 2:
                return '#FF0000'
            case 3:
                return '#FF00FF'
            case 4:
                return '#00FFFF'
            case 5:
                return '#000000'
            case 6:
                return '#FFFF00'
            case 7:
                return '#800000'
            case 8:
                return '#FF5100'
            case 9:
                return '#008080'
        }
    }

}