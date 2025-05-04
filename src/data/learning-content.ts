
export interface LearningModule {
  system?: string; // e.g., Metric, Imperial, SI
  category: string; // e.g., Length, Weight, Temperature
  title: string;
  description: string;
  key_units?: string[];
  conversion_examples?: { from: string; to: string }[];
  fun_fact?: string;
  visual?: string; // Placeholder for image file name or path
}

export const learningContent: LearningModule[] = [
  // --- Length ---
  {
    system: "Metric",
    category: "Length",
    title: "Metric Length: Meters",
    description: "The base unit of length in the Metric system (and SI system) is the meter (m). Prefixes like 'kilo-', 'centi-', and 'milli-' denote multiples or fractions.",
    key_units: ["Kilometer (km)", "Meter (m)", "Centimeter (cm)", "Millimeter (mm)"],
    conversion_examples: [
      { from: "1 km", to: "1000 m" },
      { from: "1 m", to: "100 cm" },
      { from: "1 cm", to: "10 mm" },
    ],
    fun_fact: "The meter was originally defined in 1793 as one ten-millionth of the distance from the equator to the North Pole.",
    visual: "metric_ruler.png",
  },
  {
    system: "Imperial/US Customary",
    category: "Length",
    title: "Imperial Length: Feet & Inches",
    description: "Used primarily in the United States, this system uses units like inches, feet, yards, and miles.",
    key_units: ["Mile (mi)", "Yard (yd)", "Foot (ft)", "Inch (in)"],
    conversion_examples: [
      { from: "1 mi", to: "1760 yd or 5280 ft" },
      { from: "1 yd", to: "3 ft" },
      { from: "1 ft", to: "12 in" },
      { from: "1 in", to: "≈ 2.54 cm" }, // Important conversion
    ],
    fun_fact: "The length of a 'foot' historically varied based on the size of the current king's foot!",
    visual: "imperial_tape_measure.png",
  },
  // --- Weight/Mass ---
  {
    system: "Metric/SI",
    category: "Weight",
    title: "Metric Mass: Kilograms",
    description: "The base unit of mass in the SI system is the kilogram (kg). Note that 'weight' is technically a force (mass * gravity), but 'mass' units are often used colloquially for weight.",
    key_units: ["Tonne (t)", "Kilogram (kg)", "Gram (g)", "Milligram (mg)"],
    conversion_examples: [
      { from: "1 t", to: "1000 kg" },
      { from: "1 kg", to: "1000 g" },
      { from: "1 g", to: "1000 mg" },
      { from: "1 kg", to: "≈ 2.205 lbs" },
    ],
    fun_fact: "Until 2019, the kilogram was defined by a physical cylinder of platinum-iridium alloy kept in France, known as the 'Le Grand K'. It's now defined by fundamental physical constants.",
    visual: "kilogram_weights.png",
  },
  {
    system: "Imperial/US Customary",
    category: "Weight",
    title: "Imperial Weight: Pounds & Ounces",
    description: "Commonly used for body weight and groceries in the US, based on pounds (lb) and ounces (oz).",
    key_units: ["Ton (US short)", "Pound (lb)", "Ounce (oz)", "Stone (st, UK)"],
    conversion_examples: [
      { from: "1 ton (US)", to: "2000 lb" },
      { from: "1 lb", to: "16 oz" },
      { from: "1 st", to: "14 lb" },
      { from: "1 lb", to: "≈ 0.454 kg" },
    ],
    visual: "scale_pounds.png",
  },
  // --- Temperature ---
  {
    system: "Metric/SI",
    category: "Temperature",
    title: "Celsius & Kelvin",
    description: "Celsius (°C) is widely used for everyday temperatures, while Kelvin (K) is the SI base unit, used in science. Kelvin starts at absolute zero.",
    key_units: ["Kelvin (K)", "Celsius (°C)"],
    conversion_examples: [
      { from: "0 °C", to: "273.15 K (Freezing Point)" },
      { from: "100 °C", to: "373.15 K (Boiling Point)" },
      { from: "K", to: "°C + 273.15" },
    ],
    fun_fact: "0 Kelvin (-273.15 °C) is absolute zero, the theoretical point at which all molecular motion ceases.",
    visual: "celsius_kelvin_thermometer.png",
  },
  {
    system: "Imperial/US Customary",
    category: "Temperature",
    title: "Fahrenheit",
    description: "Primarily used in the US, the Fahrenheit (°F) scale sets the freezing point of water at 32°F and boiling at 212°F.",
    key_units: ["Fahrenheit (°F)"],
    conversion_examples: [
      { from: "°F", to: "(°F - 32) * 5/9 °C" },
      { from: "°C", to: "(°C * 9/5) + 32 °F" },
      { from: "32 °F", to: "0 °C" },
      { from: "212 °F", to: "100 °C" },
    ],
    fun_fact: "Daniel Gabriel Fahrenheit based his scale on three points: a freezing brine solution (0°F), freezing water (32°F), and human body temperature (originally set at 96°F, later adjusted).",
    visual: "fahrenheit_thermometer.png",
  },
  // --- Time ---
   {
    category: "Time",
    title: "Units of Time",
    description: "Time is measured universally using seconds, minutes, hours, days, weeks, months, and years. The second (s) is the SI base unit.",
    key_units: ["Year (yr)", "Month (mo)", "Week (wk)", "Day (d)", "Hour (h)", "Minute (min)", "Second (s)", "Millisecond (ms)"],
    conversion_examples: [
        { from: "1 min", to: "60 s"},
        { from: "1 h", to: "60 min or 3600 s"},
        { from: "1 d", to: "24 h"},
        { from: "1 wk", to: "7 d"},
    ],
    fun_fact: "A 'jiffy' is an actual unit of time used in physics and computing, often representing the time between alternating current cycles (1/60 or 1/50 of a second) or the tick of a system clock.",
   },
   {
       category: "Time",
       title: "Calendars: Gregorian",
       description: "The Gregorian calendar is the most widely used civil calendar today. It adjusted the Julian calendar to more accurately reflect the solar year, introducing a refined leap year rule.",
       key_units: ["Day", "Month", "Year", "Leap Year"],
       fun_fact: "Because the Gregorian calendar was adopted at different times by different countries, dates can be ambiguous. For example, George Washington was born on Feb 11, 1731 (Old Style), but his birthday is celebrated on Feb 22, 1732 (New Style).",
   },
   // --- Data Storage ---
    {
        category: "Data Storage",
        title: "Digital Units: Bits & Bytes",
        description: "Digital information is measured in bits (b) and bytes (B). Prefixes can be decimal (powers of 1000, like KB, MB, GB) or binary (powers of 1024, like KiB, MiB, GiB).",
        key_units: ["Bit (b)", "Byte (B)", "Kilobyte (KB)", "Kibibyte (KiB)", "Megabyte (MB)", "Mebibyte (MiB)", "Gigabyte (GB)", "Gibibyte (GiB)"],
        conversion_examples: [
            { from: "1 Byte", to: "8 bits" },
            { from: "1 KB", to: "1000 Bytes" },
            { from: "1 KiB", to: "1024 Bytes" },
            { from: "1 MB", to: "1000 KB" },
            { from: "1 MiB", to: "1024 KiB" },
        ],
        fun_fact: "The term 'byte' was coined by Werner Buchholz in 1956 during the early design phase for the IBM Stretch computer.",
        visual: "binary_code.png",
    },
    // --- Chemistry ---
    {
        category: "Chemistry",
        title: "Molar Mass (Molecular Weight)",
        description: "Molar mass (M) is the mass of one mole of a substance (element or compound), expressed in grams per mole (g/mol). It's calculated by summing the atomic masses of all atoms in the chemical formula.",
        key_units: ["grams per mole (g/mol)"],
        conversion_examples: [
            { from: "H₂O (Water)", to: "≈ 18.015 g/mol" },
            { from: "CO₂ (Carbon Dioxide)", to: "≈ 44.01 g/mol" },
            { from: "NaCl (Salt)", to: "≈ 58.44 g/mol" },
        ],
        fun_fact: "A mole (Avogadro's number, ≈ 6.022 x 10²³) is a huge number! One mole of standard ping pong balls would cover the entire surface of the Earth to a depth of about 50 miles (80 km).",
    },
    {
        category: "Chemistry",
        title: "pH Scale",
        description: "The pH scale measures the acidity or alkalinity of an aqueous solution. It ranges from 0 (highly acidic) to 14 (highly alkaline), with 7 being neutral.",
        key_units: ["pH value (dimensionless)", "pOH", "[H⁺] (mol/L)", "[OH⁻] (mol/L)"],
        conversion_examples: [
            { from: "pH 7", to: "Neutral" },
            { from: "pH < 7", to: "Acidic (e.g., Lemon Juice ≈ 2)" },
            { from: "pH > 7", to: "Alkaline (e.g., Bleach ≈ 13)" },
            { from: "pH + pOH", to: "= 14 (at 25°C)" },
        ],
        fun_fact: "The 'p' in pH stands for 'potential' or 'power' (from the German 'Potenz') of Hydrogen.",
        visual: "ph_scale_colors.png",
    },
];
