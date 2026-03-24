
export type UnitCategory = 
  | "Length" | "Area" | "Mass" | "Volume" | "Temperature" | "Time" | "Speed" 
  | "Pressure" | "Energy" | "Power" | "Digital Storage" | "Data Transfer Rate" | "Angle" | "Force" 
  | "Frequency" | "Voltage" | "Current" | "Resistance" | "Torque" | "Viscosity" | "Illuminance"
  | "Fuel Consumption" | "Radioactivity" | "Radiation Dose" | "Magnetic Field" | "Sound Level";

export interface Unit {
  name: string;
  symbol: string;
  factor: number | string; // string used for complex logic like Temp or Fuel
}

export type AppMode = "CALCULATOR" | "CONVERTER";

export type CalcSubMode = "SCIENTIFIC" | "COMMERCIAL";

export type AngleMode = "DEG" | "RAD";
