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

