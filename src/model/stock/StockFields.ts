import {FundamentalsCell} from "../table/FundamentalsCell";

export interface StockFields {
    symbol: FundamentalsCell
    [fieldName: string]: FundamentalsCell
    score: FundamentalsCell
}