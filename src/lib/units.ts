
// src/lib/units.ts

export interface Unit {
    value: string;
    label: string;
  }

  export const currencyUnits: Unit[] = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
    { value: 'INR', label: 'INR - Indian Rupee' },
    // Add more currencies if needed
  ];

  export const distanceUnits: Unit[] = [
    { value: 'km', label: 'Kilometer (km)' },
    { value: 'm', label: 'Meter (m)' },
    { value: 'cm', label: 'Centimeter (cm)' },
    { value: 'mm', label: 'Millimeter (mm)' },
    { value: 'mi', label: 'Mile (mi)' },
    { value: 'yd', label: 'Yard (yd)' },
    { value: 'ft', label: 'Foot (ft)' },
    { value: 'in', label: 'Inch (in)' },
  ];

  export const weightUnits: Unit[] = [
    { value: 'kg', label: 'Kilogram (kg)' },
    { value: 'g', label: 'Gram (g)' },
    { value: 'mg', label: 'Milligram (mg)' },
    { value: 't', label: 'Metric Ton (t)' },
    { value: 'lb', label: 'Pound (lb)' },
    { value: 'oz', label: 'Ounce (oz)' },
    { value: 'st', label: 'Stone (st)' },
  ];

  export const temperatureUnits: Unit[] = [
    { value: 'C', label: 'Celsius (°C)' },
    { value: 'F', label: 'Fahrenheit (°F)' },
    { value: 'K', label: 'Kelvin (K)' },
  ];

  export const timeUnits: Unit[] = [
    { value: 's', label: 'Second (s)' },
    { value: 'ms', label: 'Millisecond (ms)' },
    { value: 'min', label: 'Minute (min)' },
    { value: 'h', label: 'Hour (h)' },
    { value: 'd', label: 'Day (d)' },
    { value: 'wk', label: 'Week (wk)' },
    { value: 'mo', label: 'Month (approx)' }, // Approximate
    { value: 'yr', label: 'Year (approx)' }, // Approximate
  ];

 export const volumeUnits: Unit[] = [
    { value: 'l', label: 'Liter (L)' },
    { value: 'ml', label: 'Milliliter (mL)' },
    { value: 'm3', label: 'Cubic Meter (m³)' },
    { value: 'gal_us', label: 'US Gallon (gal)' },
    { value: 'qt_us', label: 'US Quart (qt)' },
    { value: 'pt_us', label: 'US Pint (pt)' },
    { value: 'cup_us', label: 'US Cup' },
    { value: 'floz_us', label: 'US Fluid Ounce (fl oz)' },
    { value: 'gal_uk', label: 'UK Gallon (gal)' },
    { value: 'floz_uk', label: 'UK Fluid Ounce (fl oz)' },
  ];

 export const speedUnits: Unit[] = [
    { value: 'm/s', label: 'Meter per second (m/s)' },
    { value: 'km/h', label: 'Kilometer per hour (km/h)' },
    { value: 'mph', label: 'Mile per hour (mph)' },
    { value: 'ft/s', label: 'Foot per second (ft/s)' },
    { value: 'knot', label: 'Knot (kn)' },
  ];

 export const areaUnits: Unit[] = [
    { value: 'm2', label: 'Square Meter (m²)' },
    { value: 'km2', label: 'Square Kilometer (km²)' },
    { value: 'ha', label: 'Hectare (ha)' },
    { value: 'ft2', label: 'Square Foot (ft²)' },
    { value: 'yd2', label: 'Square Yard (yd²)' },
    { value: 'acre', label: 'Acre (ac)' },
    { value: 'mi2', label: 'Square Mile (mi²)' },
  ];

 export const dataStorageUnits: Unit[] = [
    { value: 'B', label: 'Byte (B)' },
    { value: 'KB', label: 'Kilobyte (KB)' }, // 1000 bytes
    { value: 'KiB', label: 'Kibibyte (KiB)' }, // 1024 bytes
    { value: 'MB', label: 'Megabyte (MB)' }, // 1000^2 bytes
    { value: 'MiB', label: 'Mebibyte (MiB)' }, // 1024^2 bytes
    { value: 'GB', label: 'Gigabyte (GB)' }, // 1000^3 bytes
    { value: 'GiB', label: 'Gibibyte (GiB)' }, // 1024^3 bytes
    { value: 'TB', label: 'Terabyte (TB)' }, // 1000^4 bytes
    { value: 'TiB', label: 'Tebibyte (TiB)' }, // 1024^4 bytes
    { value: 'bit', label: 'Bit (b)' },
  ];

 export const energyUnits: Unit[] = [
    { value: 'J', label: 'Joule (J)' },
    { value: 'kJ', label: 'Kilojoule (kJ)' },
    { value: 'cal', label: 'Calorie (cal)' },
    { value: 'kcal', label: 'Kilocalorie (kcal)' },
    { value: 'Wh', label: 'Watt-hour (Wh)' },
    { value: 'kWh', label: 'Kilowatt-hour (kWh)' },
    { value: 'Btu', label: 'British Thermal Unit (BTU)' },
    { value: 'ftlb', label: 'Foot-pound (ft⋅lb)' },
  ];

 export const pressureUnits: Unit[] = [
    { value: 'Pa', label: 'Pascal (Pa)' },
    { value: 'kPa', label: 'Kilopascal (kPa)' },
    { value: 'bar', label: 'Bar (bar)' },
    { value: 'psi', label: 'Pound per square inch (psi)' },
    { value: 'atm', label: 'Atmosphere (atm)' },
    { value: 'torr', label: 'Torr (mmHg)' },
  ];

 export const powerUnits: Unit[] = [
    { value: 'W', label: 'Watt (W)' },
    { value: 'kW', label: 'Kilowatt (kW)' },
    { value: 'MW', label: 'Megawatt (MW)' },
    { value: 'hp_m', label: 'Metric Horsepower (hp(M))' },
    { value: 'hp_e', label: 'Mechanical Horsepower (hp(I))' },
    { value: 'Btu/h', label: 'BTU per hour (BTU/h)' },
    { value: 'ftlb/s', label: 'Foot-pound per second (ft⋅lb/s)' },
  ];

  export const fuelEconomyUnits: Unit[] = [
    { value: 'mpg_us', label: 'Miles per Gallon (US MPG)' },
    { value: 'mpg_uk', label: 'Miles per Gallon (UK MPG)' },
    { value: 'l_100km', label: 'Liters per 100km (L/100km)' },
    { value: 'km_l', label: 'Kilometers per Liter (km/L)' },
  ];
