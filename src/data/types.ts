export interface DataBasal {
  annotations: Annotation[];
  deliveryType: string;
  duration: number;
  id: string;
  insulinFormulation: InsulinFormulation;
  origin: Origin;
  payload: PayloadBasal;
  rate: number;
  scheduleName: string;
  suppressed: Suppressed;
  time: string;
  type: "basal";
  uploadId: string;
}

interface Annotation {
  code: string;
}

interface InsulinFormulation {
  simple: Simple;
}

interface Simple {
  actingType: string;
  brand: string;
}

interface Origin {
  id: string;
  name: string;
  type: string;
  version: string;
}

interface PayloadBasal {
  syncIdentifier: string;
}

interface Suppressed {
  deliveryType: string;
  rate: number;
  scheduleName: string;
  type: string;
}

export interface DataBolus {
  id: string;
  insulinFormulation: InsulinFormulation;
  normal: number;
  origin: Origin;
  payload: PayloadBolus;
  subType: string;
  time: string;
  type: "bolus";
  uploadId: string;
}

interface PayloadBolus {
  duration: number;
  syncIdentifier: string;
}

export interface DataCBG {
  _deduplicator: Deduplicator;
  clockDriftOffset: number;
  conversionOffset: number;
  deviceId: string;
  deviceTime: string;
  id: string;
  payload: PayloadCBG;
  revision: number;
  time: string;
  timezoneOffset: number;
  type: "cbg";
  units: string;
  uploadId: string;
  value: number;
}

interface Deduplicator {
  hash: string;
}

interface PayloadCBG {
  logIndices: number[];
}

export interface DataSMBG extends Omit<DataCBG, "type"> {
  type: "smbg";
  subType: "scanned";
}

export interface DataWizard {
  bgInput: number;
  bgTarget: BgTarget;
  bolus: string;
  carbInput: number;
  clockDriftOffset: number;
  conversionOffset: number;
  deviceId: string;
  deviceTime: string;
  guid: string;
  id: string;
  insulinCarbRatio: number;
  insulinOnBoard: number;
  insulinSensitivity: number;
  payload: PayloadWizard;
  recommended: Recommended;
  time: string;
  timezoneOffset: number;
  type: "wizard";
  units: string;
  uploadId: string;
}

interface BgTarget {
  high: number;
  target: number;
}

interface PayloadWizard {
  bg_correction_threshold: number;
  carb_bolus_delivered: number;
  carb_bolus_programmed: number;
  carb_bolus_suggested: number;
  carb_bolus_units_delivered: number;
  carb_bolus_units_programmed: number;
  carb_bolus_units_suggested: number;
  carb_grams: number;
  corr_units_delivered: number;
  corr_units_iob: number;
  corr_units_programmed: number;
  corr_units_suggested: number;
  correction_delivered: number;
  correction_factor_used: number;
  correction_iob: number;
  correction_programmed: number;
  correction_suggested: number;
  current_bg: number;
  ic_ratio_used: number;
  logIndices: number[];
  meal_iob: number;
  meal_units_iob: number;
  target_bg: number;
}

interface Recommended {
  carb: number;
  correction: number;
  net: number;
}
export interface DataUpload {
  // Include all the fields that can be included in the data to be uploaded
  // according to the Tidepool API documentation.
  // For example:
  time: string;
  timezoneOffset: number;
  deviceId: string;
  uploadId: string;
export type Data = DataBolus | DataBasal | DataCBG | DataSMBG | DataWizard;
}

export type Data = DataBolus | DataBasal | DataCBG | DataSMBG | DataWizard | DataUpload;

export type Type = Data["type"];