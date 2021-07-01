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
    finalMultiple1?: number
    finalMultiple2?: number
}

export interface DiscountedFCFCalculatorState {
    currentValue?: string
    discount?: string
    years?: string
    growth1?: string
    growth2?: string
    finalMultiple1: string
    finalMultiple2: string
    intrinsicValue1?: number
    intrinsicValue2?: number
}

export class DiscountedFCFCalculator extends React.Component<DiscountedFCFCalculatorProps, DiscountedFCFCalculatorState> {

    constructor(props: Readonly<DiscountedFCFCalculatorProps>) {
        super(props);
        this.state = {
            growth1: props.growth1 ? props.growth1.toString() : '',
            growth2: props.growth2 ? props.growth2.toString() : '',
            finalMultiple1: props.finalMultiple1 ? props.finalMultiple1.toString() : '10',
            finalMultiple2: props.finalMultiple2 ? props.finalMultiple2.toString() : '15',
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
        const finalMultiple1 = Number.parseFloat(updatedState.finalMultiple1)
        const finalMultiple2 = Number.parseFloat(updatedState.finalMultiple2)

        if(growth1) {
            const intrinsicValueResult = StockAnalystService.calcIntrinsicValue(0, currentValue, growth1, discount, years);
            updatedState.intrinsicValue1 = intrinsicValueResult.intrinsicValue * finalMultiple1
        }
        if(growth2) {
            const intrinsicValueResult = StockAnalystService.calcIntrinsicValue(0, currentValue, growth2, discount, years);
            updatedState.intrinsicValue2 = intrinsicValueResult.intrinsicValue * finalMultiple2
        }
        return {...updatedState}
    }


    render = () => {
        return (
            <div className='DiscountedFCFCalculator'>
                <label>
                    CV
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
                    Multip. 1
                    <input value={this.state.finalMultiple1} type="text" name="finalMultiple1"
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Multip. 2
                    <input value={this.state.finalMultiple2} type="text" name="finalMultiple2"
                           onChange={this.handleChange}/>
                </label>

                <label>Intr.V 1
                    <input value={DiscountedFCFCalculator.formatNumber(this.state.intrinsicValue1)} type="text" name="intrinsicValue1"
                           readOnly={true} className="IntrinsicValue"/>
                </label>
                <label>Intr.V 2
                    <input value={DiscountedFCFCalculator.formatNumber(this.state.intrinsicValue2)} type="text" name="intrinsicValue2"
                           readOnly={true} className="IntrinsicValue"/></label>
            </div>
        )
    };

    private static formatNumber(value: any): string {
        return !value || Number.isNaN(value) ? '' : value.toFixed(1);
    }
}