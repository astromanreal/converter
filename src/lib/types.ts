
export interface AmortizationPoint {
  month: number;
  year: number;
  interest: number;
  principal: number;
  remainingBalance: number;
  totalInterestPaid: number;
}

export interface InvestmentGrowthPoint {
  year: number;
  value: number;
  contributions: number;
  gains: number;
}
