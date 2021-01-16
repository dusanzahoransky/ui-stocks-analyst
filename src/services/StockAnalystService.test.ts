import {StockAnalystService} from "./StockAnalystService";


it('ratio positive numbers calc', async () => {
    expect(StockAnalystService.ratioScore(1, 75)).toBe(-1)
    expect(StockAnalystService.ratioScore(75, 75)).toBe(-75)
    expect(StockAnalystService.ratioScore(76, 75)).toBe(-150)
});

it('ratio negative numbers calc', async () => {
    expect(StockAnalystService.ratioScore(-0.01, 75))
        .toBeLessThan(StockAnalystService.ratioScore(1000, 75))

    expect(StockAnalystService.ratioScore(-10, 75))
        .toBeGreaterThan(StockAnalystService.ratioScore(-1, 75))

    expect(StockAnalystService.ratioScore(-1000, 75))
        .toBeGreaterThan(StockAnalystService.ratioScore(-1, 75))
});

it('ratio with positive limit, positive numbers calc', async () => {
    expect(StockAnalystService.ratioBetterThan(1, 5, 75)).toBe(4)
    expect(StockAnalystService.ratioBetterThan(5, 5, 75)).toBe(0)
    expect(StockAnalystService.ratioBetterThan(6, 5, 75)).toBe(-1)
    expect(StockAnalystService.ratioBetterThan(75, 5, 75)).toBe(-70)
    expect(StockAnalystService.ratioBetterThan(80, 5, 75)).toBe(-75)
    expect(StockAnalystService.ratioBetterThan(81, 5, 75)).toBe(-150)
});

it('ratio with positive limit, negative numbers calc', async () => {
    expect(StockAnalystService.ratioBetterThan(-0.01, 5, 75))
        .toBeLessThan(StockAnalystService.ratioBetterThan(1000, 5, 75))

    expect(StockAnalystService.ratioBetterThan(-10, 5, 75))
        .toBeGreaterThan(StockAnalystService.ratioBetterThan(-1, 5, 75))

    expect(StockAnalystService.ratioBetterThan(-1000, 5, 75))
        .toBeGreaterThan(StockAnalystService.ratioBetterThan(-1, 5, 75))
});

