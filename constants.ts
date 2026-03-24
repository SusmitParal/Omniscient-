
import { UnitCategory, Unit } from './types';

export const UNIT_DATABASE: Record<UnitCategory, Unit[]> = {
  "Length": [
    { name: "Meter", symbol: "m", factor: 1 },
    { name: "Kilometer", symbol: "km", factor: 1000 },
    { name: "Centimeter", symbol: "cm", factor: 0.01 },
    { name: "Millimeter", symbol: "mm", factor: 0.001 },
    { name: "Micrometer", symbol: "μm", factor: 1e-6 },
    { name: "Nanometer", symbol: "nm", factor: 1e-9 },
    { name: "Mile", symbol: "mi", factor: 1609.344 },
    { name: "Yard", symbol: "yd", factor: 0.9144 },
    { name: "Foot", symbol: "ft", factor: 0.3048 },
    { name: "Inch", symbol: "in", factor: 0.0254 },
    { name: "Nautical Mile", symbol: "nmi", factor: 1852 },
    { name: "Furlong", symbol: "fur", factor: 201.168 },
    { name: "Light Year", symbol: "ly", factor: 9.4607e15 },
    { name: "Astronomical Unit", symbol: "AU", factor: 1.496e11 },
    { name: "Parsec", symbol: "pc", factor: 3.0857e16 },
    { name: "Angstrom", symbol: "Å", factor: 1e-10 }
  ],
  "Area": [
    { name: "Square Meter", symbol: "m²", factor: 1 },
    { name: "Square Kilometer", symbol: "km²", factor: 1e6 },
    { name: "Hectare", symbol: "ha", factor: 10000 },
    { name: "Acre", symbol: "ac", factor: 4046.856 },
    { name: "Square Mile", symbol: "mi²", factor: 2.589988e6 },
    { name: "Square Yard", symbol: "yd²", factor: 0.836127 },
    { name: "Square Foot", symbol: "ft²", factor: 0.092903 },
    { name: "Square Inch", symbol: "in²", factor: 0.00064516 }
  ],
  "Mass": [
    { name: "Kilogram", symbol: "kg", factor: 1 },
    { name: "Gram", symbol: "g", factor: 0.001 },
    { name: "Milligram", symbol: "mg", factor: 1e-6 },
    { name: "Metric Ton", symbol: "t", factor: 1000 },
    { name: "Pound", symbol: "lb", factor: 0.453592 },
    { name: "Ounce", symbol: "oz", factor: 0.0283495 },
    { name: "Stone", symbol: "st", factor: 6.35029 },
    { name: "Carat", symbol: "ct", factor: 0.0002 },
    { name: "Grain", symbol: "gr", factor: 6.479891e-5 },
    { name: "Troy Ounce", symbol: "t oz", factor: 0.0311035 }
  ],
  "Volume": [
    { name: "Liter", symbol: "L", factor: 1 },
    { name: "Milliliter", symbol: "mL", factor: 0.001 },
    { name: "Cubic Meter", symbol: "m³", factor: 1000 },
    { name: "US Gallon", symbol: "gal", factor: 3.78541 },
    { name: "US Quart", symbol: "qt", factor: 0.946353 },
    { name: "US Pint", symbol: "pt", factor: 0.473176 },
    { name: "US Cup", symbol: "cup", factor: 0.236588 },
    { name: "Fluid Ounce", symbol: "fl oz", factor: 0.0295735 },
    { name: "Imperial Gallon", symbol: "imp gal", factor: 4.54609 }
  ],
  "Temperature": [
    { name: "Celsius", symbol: "°C", factor: "C" },
    { name: "Fahrenheit", symbol: "°F", factor: "F" },
    { name: "Kelvin", symbol: "K", factor: "K" },
    { name: "Rankine", symbol: "°R", factor: "R" }
  ],
  "Time": [
    { name: "Second", symbol: "s", factor: 1 },
    { name: "Minute", symbol: "min", factor: 60 },
    { name: "Hour", symbol: "h", factor: 3600 },
    { name: "Day", symbol: "d", factor: 86400 },
    { name: "Week", symbol: "wk", factor: 604800 },
    { name: "Month (Avg)", symbol: "mo", factor: 2.628e6 },
    { name: "Year", symbol: "yr", factor: 3.1536e7 },
    { name: "Nanosecond", symbol: "ns", factor: 1e-9 },
    { name: "Millisecond", symbol: "ms", factor: 0.001 }
  ],
  "Speed": [
    { name: "m/s", symbol: "m/s", factor: 1 },
    { name: "km/h", symbol: "km/h", factor: 0.277778 },
    { name: "mph", symbol: "mph", factor: 0.44704 },
    { name: "Knot", symbol: "kn", factor: 0.514444 },
    { name: "Mach", symbol: "Ma", factor: 340.3 }
  ],
  "Pressure": [
    { name: "Pascal", symbol: "Pa", factor: 1 },
    { name: "Bar", symbol: "bar", factor: 100000 },
    { name: "PSI", symbol: "psi", factor: 6894.76 },
    { name: "Atmosphere", symbol: "atm", factor: 101325 },
    { name: "Torr", symbol: "Torr", factor: 133.322 }
  ],
  "Energy": [
    { name: "Joule", symbol: "J", factor: 1 },
    { name: "Kilojoule", symbol: "kJ", factor: 1000 },
    { name: "Calorie", symbol: "cal", factor: 4.184 },
    { name: "Kilocalorie", symbol: "kcal", factor: 4184 },
    { name: "Watt-hour", symbol: "Wh", factor: 3600 },
    { name: "Electronvolt", symbol: "eV", factor: 1.60218e-19 },
    { name: "BTU", symbol: "BTU", factor: 1055.06 }
  ],
  "Power": [
    { name: "Watt", symbol: "W", factor: 1 },
    { name: "Kilowatt", symbol: "kW", factor: 1000 },
    { name: "Horsepower", symbol: "hp", factor: 745.7 },
    { name: "Megawatt", symbol: "MW", factor: 1e6 }
  ],
  "Digital Storage": [
    { name: "Byte", symbol: "B", factor: 1 },
    { name: "Bit", symbol: "bit", factor: 0.125 },
    { name: "Kilobyte", symbol: "KB", factor: 1024 },
    { name: "Megabyte", symbol: "MB", factor: 1.048576e6 },
    { name: "Gigabyte", symbol: "GB", factor: 1.073742e9 },
    { name: "Terabyte", symbol: "TB", factor: 1.099512e12 },
    { name: "Petabyte", symbol: "PB", factor: 1.1259e15 }
  ],
  "Data Transfer Rate": [
    { name: "bps", symbol: "bps", factor: 1 },
    { name: "kbps", symbol: "kbps", factor: 1000 },
    { name: "Mbps", symbol: "Mbps", factor: 1e6 },
    { name: "Gbps", symbol: "Gbps", factor: 1e9 },
    { name: "Tbps", symbol: "Tbps", factor: 1e12 }
  ],
  "Angle": [
    { name: "Degree", symbol: "°", factor: 1 },
    { name: "Radian", symbol: "rad", factor: 57.2958 },
    { name: "Gradian", symbol: "grad", factor: 0.9 }
  ],
  "Force": [
    { name: "Newton", symbol: "N", factor: 1 },
    { name: "Dyne", symbol: "dyn", factor: 1e-5 },
    { name: "Pound-force", symbol: "lbf", factor: 4.44822 }
  ],
  "Frequency": [
    { name: "Hertz", symbol: "Hz", factor: 1 },
    { name: "Kilohertz", symbol: "kHz", factor: 1000 },
    { name: "Megahertz", symbol: "MHz", factor: 1e6 },
    { name: "Gigahertz", symbol: "GHz", factor: 1e9 }
  ],
  "Voltage": [
    { name: "Volt", symbol: "V", factor: 1 },
    { name: "Millivolt", symbol: "mV", factor: 0.001 },
    { name: "Kilovolt", symbol: "kV", factor: 1000 }
  ],
  "Current": [
    { name: "Ampere", symbol: "A", factor: 1 },
    { name: "Milliampere", symbol: "mA", factor: 0.001 },
    { name: "Microampere", symbol: "μA", factor: 1e-6 }
  ],
  "Resistance": [
    { name: "Ohm", symbol: "Ω", factor: 1 },
    { name: "Kilohm", symbol: "kΩ", factor: 1000 },
    { name: "Megohm", symbol: "MΩ", factor: 1e6 }
  ],
  "Torque": [
    { name: "Newton-meter", symbol: "N·m", factor: 1 },
    { name: "Pound-foot", symbol: "lb·ft", factor: 1.355818 }
  ],
  "Viscosity": [
    { name: "Pascal-second", symbol: "Pa·s", factor: 1 },
    { name: "Poise", symbol: "P", factor: 0.1 },
    { name: "Centipoise", symbol: "cP", factor: 0.001 }
  ],
  "Illuminance": [
    { name: "Lux", symbol: "lx", factor: 1 },
    { name: "Foot-candle", symbol: "fc", factor: 10.76391 }
  ],
  "Fuel Consumption": [
    { name: "L/100km", symbol: "L/100km", factor: "L100" },
    { name: "km/L", symbol: "km/L", factor: "KML" },
    { name: "MPG (US)", symbol: "mpg US", factor: "MPG_US" },
    { name: "MPG (UK)", symbol: "mpg UK", factor: "MPG_UK" }
  ],
  "Radioactivity": [
    { name: "Becquerel", symbol: "Bq", factor: 1 },
    { name: "Curie", symbol: "Ci", factor: 3.7e10 },
    { name: "Rutherford", symbol: "Rd", factor: 1e6 }
  ],
  "Radiation Dose": [
    { name: "Gray", symbol: "Gy", factor: 1 },
    { name: "Sievert", symbol: "Sv", factor: 1 },
    { name: "Rad", symbol: "rad", factor: 0.01 },
    { name: "Rem", symbol: "rem", factor: 0.01 }
  ],
  "Magnetic Field": [
    { name: "Tesla", symbol: "T", factor: 1 },
    { name: "Gauss", symbol: "G", factor: 0.0001 }
  ],
  "Sound Level": [
    { name: "Decibel", symbol: "dB", factor: 1 },
    { name: "Bel", symbol: "B", factor: 10 }
  ]
};
