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

export interface IndicesPriceChartState {
    /**
     * A singe symbol latest price will be chosen and all other symbols, all prices will be multiplied by a constant number,so their latest price will match the chosen symbol latest price. Which will allow growth over the time comparison.
     */
    consolidatePrice?: boolean
}

export class IndicesPriceChart extends React.Component<IndicesPriceChartProps, IndicesPriceChartState> {

    constructor(props: Readonly<IndicesPriceChartProps>) {
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
            return <Line key={s} type="monotone" dataKey={s} stroke={this.getColorForIndex(index)} dot={false}
                         legendType={"plainline"}
                         isAnimationActive={false} connectNulls={true}/>
        })
        const chartData = this.state.consolidatePrice ? this.consolidatePrice(data) : data

        return (
            <div className={'IndicesPriceChart'}>
                {chartLabel}
                Consolidate price: <input
                name="consolidatePrice"
                type="checkbox"
                checked={this.state.consolidatePrice}
                onChange={this.onConsolidatePriceClickHandler}/>
                {chartDescription}
                <LineChart width={1800} height={400} data={chartData}>
                    {lines}
                    <XAxis dataKey="date"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                </LineChart>
            </div>
        )
    }


    private consolidatePrice(data: IndicesChartData[]) {
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
        this.setState({
                consolidatePrice: value
            }
        )
    }

    getColorForIndex(index: number) {
        switch (index % 10) {
            case 0:
                return '#0000FF'
            case 1:
                return '#008000'
            case 2:
                return '#FF0000'
            case 3:
                return '#000080'
            case 4:
                return '#008080'
            case 5:
                return '#FFFF00'
            case 6:
                return '#800000'
            case 7:
                return '#008080'
            case 8:
                return '#00FFFF'
            case 9:
                return '#FF00FF'
        }
    }

}