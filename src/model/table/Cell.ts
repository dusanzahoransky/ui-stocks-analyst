export interface Cell<T> {
    value?: T
    title?: string
    score?: number
    isPercentage?: boolean
    isGrowth?: boolean
    classes?: string[]
}