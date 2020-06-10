import React from "react";
import 'font-awesome/css/font-awesome.min.css';

import './StickerPriceCalculator.css';


export interface StickerPriceCalculatorProps {
    rule1GrowthRate?: number
    rule1pe?: number
    currentEps?: number
}

export interface StickerPriceCalculatorState {
    rule1GrowthRate?: string
    rule1pe?: string
    currentEps?: string
    futureEps10Y?: number
    futurePrice10Y?: number
    stickerPrice15pc?: number
    stickerPrice10pc?: number
    stickerPrice5pc?: number
}

export class StickerPriceCalculator extends React.Component<StickerPriceCalculatorProps, StickerPriceCalculatorState> {

    constructor(props: Readonly<StickerPriceCalculatorProps>) {
        super(props);
        this.state = {
            rule1GrowthRate: props.rule1GrowthRate ? props.rule1GrowthRate.toString() : '',
            rule1pe: props.rule1pe ? props.rule1GrowthRate.toString() : '',
            currentEps: props.currentEps ? props.rule1GrowthRate.toString() : ''
        }
        this.recalculateValues(this.state)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let updatedState = {...this.state, [event.target.name]: event.target.value}
        updatedState = this.recalculateValues(updatedState)
        this.setState(updatedState);
    }

    recalculateValues(updatedState: StickerPriceCalculatorState): StickerPriceCalculatorState {
        const rule1GrowthPc = (Number.parseFloat(updatedState.rule1GrowthRate) / 100) + 1
        updatedState.futureEps10Y = Number.parseFloat(updatedState.currentEps) * Math.pow(rule1GrowthPc, 10)
        updatedState.futurePrice10Y = Number.parseFloat(updatedState.rule1pe) * updatedState.futureEps10Y
        updatedState.stickerPrice15pc = updatedState.futurePrice10Y / Math.pow(1.15, 10)
        updatedState.stickerPrice10pc = updatedState.futurePrice10Y / Math.pow(1.10, 10)
        updatedState.stickerPrice5pc = updatedState.futurePrice10Y / Math.pow(1.05, 10)
        return {...updatedState}
    }


    render = () => {
        return (
            <div className='StickerPriceCalculator'>
                <label>
                    R1 grw
                    <input value={this.state.rule1GrowthRate} type="text" name="rule1GrowthRate"
                           onChange={this.handleChange}/>
                </label>
                <label>
                    R1 pe
                    <input value={this.state.rule1pe} type="text" name="rule1pe" onChange={this.handleChange}/>
                </label>
                <label>
                    Eps
                    <input value={this.state.currentEps} type="text" name="currentEps" onChange={this.handleChange}/>
                </label>
                <label>Fut eps
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
            </div>
        )
    };

    private formatNumber(value: any): string {
        return !value || Number.isNaN(value) ? '' : value.toFixed(1);
    }
}