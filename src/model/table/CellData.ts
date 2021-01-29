import {ScoreAdditionalInfo} from "./ScoreAdditionalInfo";

export interface CellData {
    value?: number | string
    additionalInfo?: ScoreAdditionalInfo
    score?: number
}