export interface PriceEpsData {
    date: string;
    price: number,
    epsQuarterly?: number,
    epsAnnually?: number,
    bpsAnnually?: number
    fcpsAnnually?: number
}