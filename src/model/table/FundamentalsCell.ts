import {Cell} from "./Cell";

export interface FundamentalsCell extends Cell<number> {
    value?: number
    title?: string
    score?: number
    isPercentage?: boolean
    isGrowth?: boolean
    classes?: string[]
}