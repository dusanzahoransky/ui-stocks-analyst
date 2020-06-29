import React from "react";
import {FormattingUtils} from "../utils/FormattingUtils";

export interface RatioChartLabelProps {
    x?: number,
    y?: number,
    stroke?: string,
    value?: number,
    index?: number
}

export class RatioChartLabel extends React.Component<RatioChartLabelProps> {
    render() {
        const {stroke, value} = this.props;
        return <text fill={stroke} fontSize={10} textAnchor="middle">{FormattingUtils.formatNumber(value)}</text>
    }
}

