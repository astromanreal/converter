/**
 * Represents currency exchange rates.
 */
export interface ExchangeRates {
  [currencyCode: string]: number;
}

/**
 * Asynchronously fetches currency exchange rates.
 * Mock implementation.
 * @returns A promise that resolves to an ExchangeRates object relative to USD.
 */
export async function getExchangeRates(): Promise<ExchangeRates> {
  // TODO: Implement this by calling a real currency exchange rate API.
  // This mock returns rates relative to USD.
  // Example: 1 USD = 0.9 EUR, 1 USD = 83 INR etc.
  console.log(`Fetching mock exchange rates (returning USD-based rates)`);
  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate network delay

  return {
    USD: 1, // Rate of base to itself is 1
    EUR: 0.92, // 1 USD = 0.92 EUR
    GBP: 0.79, // 1 USD = 0.79 GBP
    JPY: 157.0, // 1 USD = 157 JPY
    CAD: 1.37, // 1 USD = 1.37 CAD
    AUD: 1.50, // 1 USD = 1.50 AUD
    INR: 83.50, // 1 USD = 83.50 INR
    // Add other currencies as needed for the mock
  };
}
