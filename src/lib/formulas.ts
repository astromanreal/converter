
import type { AmortizationPoint, InvestmentGrowthPoint } from './types';

/**
 * Calculates the amortization schedule for a loan.
 * @param principal - The total loan amount.
 * @param annualRate - The annual interest rate (e.g., 5 for 5%).
 * @param years - The loan term in years.
 * @returns An object containing the schedule, monthly payment, total payment, and total interest.
 */
export function calculateAmortization(principal: number, annualRate: number, years: number) {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfPayments = years * 12;

  if (principal <= 0 || annualRate < 0 || years <= 0) {
    return { schedule: [], monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
  }

  const monthlyPayment =
    monthlyRate > 0
      ? principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1)
      : principal / numberOfPayments;
  
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principal;

  const schedule: AmortizationPoint[] = [];
  let remainingBalance = principal;
  let totalInterestPaid = 0;

  for (let i = 1; i <= numberOfPayments; i++) {
    const interestForMonth = remainingBalance * monthlyRate;
    const principalForMonth = monthlyPayment - interestForMonth;
    remainingBalance -= principalForMonth;
    totalInterestPaid += interestForMonth;

    schedule.push({
      month: i,
      year: Math.ceil(i/12),
      interest: interestForMonth,
      principal: principalForMonth,
      remainingBalance: remainingBalance > 0 ? remainingBalance : 0,
      totalInterestPaid: totalInterestPaid,
    });
  }

  return { schedule, monthlyPayment, totalPayment, totalInterest };
}

/**
 * Calculates the future value of an investment with regular contributions.
 * @param initialInvestment - The starting amount.
 * @param monthlyContribution - The amount contributed each month.
 * @param years - The investment duration in years.
 * @param annualRate - The expected annual rate of return (e.g., 7 for 7%).
 * @returns An object containing the growth data per year and the final value.
 */
export function calculateInvestmentGrowth(initialInvestment: number, monthlyContribution: number, years: number, annualRate: number) {
  const monthlyRate = annualRate / 100 / 12;
  const numberOfMonths = years * 12;
  const growthData: InvestmentGrowthPoint[] = [];
  let futureValue = initialInvestment;
  let totalContributions = initialInvestment;

  growthData.push({ year: 0, value: initialInvestment, contributions: initialInvestment, gains: 0 });

  for (let i = 1; i <= numberOfMonths; i++) {
    futureValue = futureValue * (1 + monthlyRate) + monthlyContribution;
    totalContributions += monthlyContribution;
    
    if (i % 12 === 0 || i === numberOfMonths) {
      const gains = futureValue - totalContributions;
      growthData.push({
        year: Math.ceil(i / 12),
        value: futureValue,
        contributions: totalContributions,
        gains: gains,
      });
    }
  }

  return { growthData, finalValue: futureValue };
}

/**
 * Calculates the monthly savings needed to reach a target amount.
 * @param targetAmount - The desired final savings amount.
 * @param initialAmount - The amount you've already saved.
 * @param years - The time frame in years.
 * @param annualRate - The expected annual interest rate on savings (e.g., 4 for 4%).
 * @returns An object with the required monthly saving and the projected growth data.
 */
export function calculateSavingsPlan(targetAmount: number, initialAmount: number, years: number, annualRate: number) {
    const monthlyRate = annualRate / 100 / 12;
    const numberOfMonths = years * 12;

    // Future value of the initial amount
    const fvOfInitial = initialAmount * Math.pow(1 + monthlyRate, numberOfMonths);

    // Future value needed from monthly contributions
    const fvOfContributions = targetAmount - fvOfInitial;

    let monthlySaving: number;
    if (monthlyRate > 0) {
        monthlySaving = fvOfContributions / ((Math.pow(1 + monthlyRate, numberOfMonths) - 1) / monthlyRate);
    } else {
        monthlySaving = fvOfContributions / numberOfMonths;
    }

    monthlySaving = Math.max(0, monthlySaving);

    // Now, calculate the growth path with this monthly saving amount
    const { growthData } = calculateInvestmentGrowth(initialAmount, monthlySaving, years, annualRate);
    
    return { monthlySaving, growthData };
}
