import React from "react";
import 'font-awesome/css/font-awesome.min.css';

import './DCFCalculator.css';
import {StockAnalystService} from "../services/StockAnalystService";


export interface DCFCalculatorProps {
    currentValue?: number
    discount?: number
    growthFirst5Years?: number
    growthNext5Years?: number
}

export interface DCFCalculatorState {
    currentValue?: string
    discount?: string
    growthFirst5Years?: string
    growthNext5Years?: string
    dfcValue?: number
}

export class DCFCalculator extends React.Component<DCFCalculatorProps, DCFCalculatorState> {

    constructor(props: Readonly<DCFCalculatorProps>) {
        super(props);
        this.state = {
            growthFirst5Years: props.growthFirst5Years ? props.growthFirst5Years.toString() : '',
            growthNext5Years: props.growthNext5Years ? props.growthNext5Years.toString() : '',
            discount: props.discount ? props.discount.toString() : '10',
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

    recalculateValues(updatedState: DCFCalculatorState): DCFCalculatorState {
        const currentValue = Number.parseFloat(updatedState.currentValue)
        const discount = Number.parseFloat(updatedState.discount)
        const growthFirst5Years = Number.parseFloat(updatedState.growthFirst5Years)
        const growthNext5Years = Number.parseFloat(updatedState.growthNext5Years)

        if(Number.isNaN(currentValue) || Number.isNaN(discount)){
            return updatedState
        }

        if(!Number.isNaN(growthFirst5Years)) {
            const dfcResultFirst5years = StockAnalystService.calcIntrinsicValueDiscountedCashFlow(currentValue, growthFirst5Years, discount, 5);
            updatedState.dfcValue = dfcResultFirst5years.intrinsicValue

            if(!Number.isNaN(growthNext5Years)) {
                const value5years = dfcResultFirst5years.finalFutureValue / dfcResultFirst5years.finalDiscountValue;
                const dfcResultNext5years = StockAnalystService.calcIntrinsicValueDiscountedCashFlow(value5years, growthNext5Years, discount, 5);
                updatedState.dfcValue += dfcResultNext5years.intrinsicValue
            }
        }
        return {...updatedState}
    }


    render = () => {
        return (
            <div className='DCFCalculator'>
                <label>
                    CV
                    <input value={this.state.currentValue} type="text" name="currentValue" onChange={this.handleChange}/>
                </label>
                <label>
                    Discount
                    <input value={this.state.discount} type="text" name="discount" onChange={this.handleChange}/>
                </label>
                <label>
                    Growth 1
                    <input value={this.state.growthFirst5Years} type="text" name="growthFirst5Years"
                           onChange={this.handleChange}/>
                </label>
                <label>
                    Growth 2
                    <input value={this.state.growthNext5Years} type="text" name="growthNext5Years"
                           onChange={this.handleChange}/>
                </label>
                <label>DFC PV
                    <input value={DCFCalculator.formatNumber(this.state.dfcValue)} type="text" name="DFC PV"
                           readOnly={true} className="IntrinsicValue"/>
                </label>
            </div>
        )
    };

    private static formatNumber(value: any): string {
        return !value || Number.isNaN(value) ? '' : value.toFixed(1);
    }
}