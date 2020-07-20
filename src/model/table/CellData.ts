import {ScoreAdditionalInfo} from "./ScoreAdditionalInfo";
import {CellTag} from "./CellTag";

export interface CellData {
    value?: number | string
    additionalInfo?: ScoreAdditionalInfo
    tags?: CellTag[]
    score?: number
}