/**
 * date and list of ETF prices e.g.:
 * 2020-08-30,
 * "VTS": 100,
 * "VGE": 55
 */
export interface EtfsChartData {
    date: number | string;
    [price: string]: number | string
}