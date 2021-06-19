import React from "react";
import 'font-awesome/css/font-awesome.min.css';

import './IntrinsicValueCalculator.css';
import {StockAnalystService} from "../services/StockAnalystService";


export interface IntrinsicValueCalculatorProps {
    growth?: number
    pe?: number
    eps?: number
}

export interface IntrinsicValueCalculatorState {
    growth?: string
    pe?: string
    eps?: string
    futureEps10Y?: number
    futurePrice10Y?: number
    stickerPrice15pc?: number
    stickerPrice10pc?: number
    stickerPrice5pc?: number
    futureYield3?: number
    futureYield5?: number
    futureYield10?: number
}

export class IntrinsicValueCalculator extends React.Component<IntrinsicValueCalculatorProps, IntrinsicValueCalculatorState> {

    constructor(props: Readonly<IntrinsicValueCalculatorProps>) {
        super(props);
        this.state = {
            growth: props.growth ? props.growth.toString() : '',
            pe: props.pe ? props.pe.toString() : '',
            eps: props.eps ? props.eps.toString() : ''
        }
        this.recalculateValues(this.state)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let updatedState = {...this.state, [event.target.name]: event.target.value}
        updatedState = this.recalculateValues(updatedState)
        this.setState(updatedState);
    }

    recalculateValues(updatedState: IntrinsicValueCalculatorState): IntrinsicValueCalculatorState {
        const growth = Number.parseFloat(updatedState.growth)
        const pe = Number.parseInt(updatedState.pe)
        const eps = Number.parseFloat(updatedState.eps)
        const growthPct = growth / 100

        if(growthPct && pe && eps) {
            updatedState.futureEps10Y = eps * Math.pow(growthPct + 1, 10)
            updatedState.futurePrice10Y = pe * updatedState.futureEps10Y
            updatedState.stickerPrice15pc = updatedState.futurePrice10Y / Math.pow(1.15, 10)
            updatedState.stickerPrice10pc = updatedState.futurePrice10Y / Math.pow(1.10, 10)
            updatedState.stickerPrice5pc = updatedState.futurePrice10Y / Math.pow(1.05, 10)
        }

        if(growthPct && pe){
            const presentValue = 100 / pe
            updatedState.futureYield3 = StockAnalystService.futureValue(presentValue, growthPct, 3)
            updatedState.futureYield5 = StockAnalystService.futureValue(presentValue, growthPct, 5)
            updatedState.futureYield10 = StockAnalystService.futureValue(presentValue, growthPct, 10)
        }
        return {...updatedState}
    }


    render = () => {
        return (
            <div className='IntrinsicValueCalculator'>
                <label>
                    Growth
                    <input value={this.state.growth} type="text" name="growth"
                           onChange={this.handleChange}/>
                </label>
                <label>
                    PE
                    <input value={this.state.pe} type="text" name="pe" onChange={this.handleChange}/>
                </label>
                <label>
                    EPS
                    <input value={this.state.eps} type="text" name="eps" onChange={this.handleChange}/>
                </label>
                <label>Fut EPS
                    <input value={this.formatNumber(this.state.futureEps10Y)} type="text" name="futureEps10Y"
                           readOnly={true}/>
                </label>
                <label>Fut price
                    <input value={this.formatNumber(this.state.futurePrice10Y)} type="text" name="futurePrice10Y"
                           readOnly={true}/></label>
                <label>Price 15%
                    <input value={this.formatNumber(this.state.stickerPrice15pc)} type="text" name="stickerPrice15pc"
                           readOnly={true}/></label>
                <label>Price 10%
                    <input value={this.formatNumber(this.state.stickerPrice10pc)} type="text" name="stickerPrice10pc"
                           readOnly={true}/></label>
                <label>Price 5%
                    <input value={this.formatNumber(this.state.stickerPrice5pc)} type="text" name="stickerPrice5pc"
                           readOnly={true}/></label>
                <label>
                    Yield 3Y
                    <input value={this.formatNumber(this.state.futureYield3)} type="text" name="futureYield3" readOnly={true}/>
                </label>
                <label>Yield 5Y
                    <input value={this.formatNumber(this.state.futureYield5)} type="text" name="futureYield5"
                           readOnly={true}/>
                </label>
                <label>Yield 10Y
                    <input value={this.formatNumber(this.state.futureYield10)} type="text" name="futureYield10"
                           readOnly={true}/></label>
            </div>
        )
    };

    private formatNumber(value: any): string {
        return !value || Number.isNaN(value) ? '' : value.toFixed(1);
    }
}