import React from "react";
import 'font-awesome/css/font-awesome.min.css';

import './DiscountedFCFCalculator.css';
import {StockAnalystService} from "../services/StockAnalystService";


export interface DiscountedFCFCalculatorProps {
    currentValue?: number
    discount?: number
    years?: number
    growth1?: number
    growth2?: number
    growth3?: number
    finalMultiple?: number
}

export interface DiscountedFCFCalculatorState {
    currentValue?: string
    discount?: string
    years?: string
    growth1?: string
    growth2?: string
    growth3?: string
    finalMultiple: string
    intrinsicValue1?: number
    intrinsicValue2?: number
    intrinsicValue3?: number
}

export class DiscountedFCFCalculator extends React.Component<DiscountedFCFCalculatorProps, DiscountedFCFCalculatorState> {

    constructor(props: Readonly<DiscountedFCFCalculatorProps>) {
        super(props);
        this.state = {
            growth1: props.growth1 ? props.growth1.toString() : '',
            growth2: props.growth2 ? props.growth2.toString() : '',
            growth3: props.growth3 ? props.growth3.toString() : '',
            finalMultiple: props.finalMultiple ? props.finalMultiple.toString() : '10',
            discount: props.discount ? props.discount.toString() : '10',
            years: props.years ? props.years.toString() : '10',
            currentValue: props.currentValue ? props.currentValue.toString() : ''
        }
        this.recalculateValues(this.state)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        let updatedState = {...this.state, [event.target.name]: event.target.value}
        updatedState = this.recalculateValues(updatedState)
        this.setState(updatedState);
    }

    recalculateValues(updatedState: DiscountedFCFCalculatorState): DiscountedFCFCalculatorState {
        const currentValue = Number.parseFloat(updatedState.currentValue)
        const discount = Number.parseFloat(updatedState.discount)
        const years = Number.parseInt(updatedState.years)

        if(!currentValue || !discount || !years){
            return updatedState
        }

        const growth1 = Number.parseFloat(updatedState.growth1)
        const growth2 = Number.parseFloat(updatedState.growth2)
        const growth3 = Number.parseFloat(updatedState.growth3)
        const finalMultiple = Number.parseFloat(updatedState.finalMultiple)

        if(growth1) {
            const intrinsicValueResult = StockAnalystService.calcIntrinsicValue(0, currentValue, growth1, discount, years);
            updatedState.intrinsicValue1 = intrinsicValueResult.intrinsicValue * finalMultiple
        }
        if(growth2) {
            const intrinsicValueResult = StockAnalystService.calcIntrinsicValue(0, currentValue, growth2, discount, years);
            updatedState.intrinsicValue2 = intrinsicValueResult.intrinsicValue * finalMultiple
        }
        if(growth3) {
            const intrinsicValueResult = StockAnalystService.calcIntrinsicValue(0, currentValue, growth3, discount, years);
            updatedState.intrinsicValue3 = intrinsicValueResult.intrinsicValue * finalMultiple
        }
        return {...updatedState}
    }


    render = () => {
        return (
            <div className='DiscountedFCFCalculator'>
                <label>
                    Current Value
                    <input value={this.state.currentValue} type="text" name="currentValue" onChange={this.handleChange}/>
                </label>
                <label>
                    Discount
                    <input value={this.state.discount} type="text" name="discount" onChange={this.handleChange}/>
                </label>
                <label>
                    Years
                    <input value={this.state.years} type="text" name="years" onChange={this.handleChange}/>
                </label>
                <label>
                    Growth 1
                    <input value={this.state.growth1} type="text" name="growth1"
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Growth 2
                    <input value={this.state.growth2} type="text" name="growth2"
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Growth 3
                    <input value={this.state.growth3} type="text" name="growth3"
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Multiple
                    <input value={this.state.finalMultiple} type="text" name="finalMultiple"
                           onChange={this.handleChange}/>
                </label>

                <label>Intr. Value 1
                    <input value={this.formatNumber(this.state.intrinsicValue1)} type="text" name="intrinsicValue1"
                           readOnly={true} className="IntrinsicValue"/>
                </label>
                <label>Intr. Value 2
                    <input value={this.formatNumber(this.state.intrinsicValue2)} type="text" name="intrinsicValue2"
                           readOnly={true} className="IntrinsicValue"/></label>
                <label>Intr. Value 3
                    <input value={this.formatNumber(this.state.intrinsicValue3)} type="text" name="intrinsicValue3"
                           readOnly={true} className="IntrinsicValue"/></label>
            </div>
        )
    };

    private formatNumber(value: any): string {
        return !value || Number.isNaN(value) ? '' : value.toFixed(1);
    }
}