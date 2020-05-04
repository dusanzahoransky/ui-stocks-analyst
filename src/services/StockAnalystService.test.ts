import {StockAnalystService} from "./StockAnalystService";

it('pe positive numbers calc', async () => {

    expect(StockAnalystService.peScore(20)).toBeGreaterThan(-5)
    expect(StockAnalystService.peScore(20)).toBeLessThan(0)

    expect(StockAnalystService.peScore(10)).toBeGreaterThan(10)
    expect(StockAnalystService.peScore(10)).toBeLessThan(20)

    expect(StockAnalystService.peScore(5)).toBeGreaterThan(20)
    expect(StockAnalystService.peScore(5)).toBeLessThan(50)

    expect(StockAnalystService.peScore(1)).toBeGreaterThan(50)
    expect(StockAnalystService.peScore(0.1)).toBeGreaterThan(StockAnalystService.peScore(1))
    expect(StockAnalystService.peScore(0.01)).toBeGreaterThan(StockAnalystService.peScore(0.1))

    expect(StockAnalystService.peScore(199)).toBeGreaterThan(StockAnalystService.peScore(201))
    expect(StockAnalystService.peScore(201)).toBeGreaterThanOrEqual(StockAnalystService.peScore(1000))


});

it('pe negative numbers calc', async () => {

    expect(StockAnalystService.peScore(-0.01)).toBeLessThan(StockAnalystService.peScore(101))

    expect(StockAnalystService.peScore(-0.1)).toBeGreaterThan(StockAnalystService.peScore(-0.01))
    expect(StockAnalystService.peScore(-1)).toBeGreaterThan(StockAnalystService.peScore(-0.1))
    expect(StockAnalystService.peScore(-10)).toBeGreaterThan(StockAnalystService.peScore(-1))

});

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
    expect(StockAnalystService.ratioBatterThan(1, 5, 75)).toBe(4)
    expect(StockAnalystService.ratioBatterThan(5, 5, 75)).toBe(0)
    expect(StockAnalystService.ratioBatterThan(6, 5, 75)).toBe(-1)
    expect(StockAnalystService.ratioBatterThan(75, 5, 75)).toBe(-70)
    expect(StockAnalystService.ratioBatterThan(80, 5, 75)).toBe(-75)
    expect(StockAnalystService.ratioBatterThan(81, 5, 75)).toBe(-150)
});

it('ratio with positive limit, negative numbers calc', async () => {
    expect(StockAnalystService.ratioBatterThan(-0.01, 5, 75))
        .toBeLessThan(StockAnalystService.ratioBatterThan(1000, 5, 75))

    expect(StockAnalystService.ratioBatterThan(-10, 5, 75))
        .toBeGreaterThan(StockAnalystService.ratioBatterThan(-1, 5, 75))

    expect(StockAnalystService.ratioBatterThan(-1000, 5, 75))
        .toBeGreaterThan(StockAnalystService.ratioBatterThan(-1, 5, 75))
});

