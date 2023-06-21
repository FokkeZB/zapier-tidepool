// TODO: Use starttime for cursor polling

import { Bundle, ZObject } from "zapier-platform-core";

interface TypeBasal {
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

interface TypeBolus {
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

interface TypeCBG {
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

interface TypeSMBG extends Omit<TypeCBG, "type"> {
  type: "smbg";
  subType: "scanned";
}

interface TypeWizard {
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

type Data = TypeBolus | TypeBasal | TypeCBG | TypeSMBG;

type Response = Array<Data>;

const perform = async (z: ZObject, bundle: Bundle): Promise<Array<Data>> => {
  const response = await z.request({
    method: "GET",
    url: `/data/${bundle.authData.userid}`,
    params: {
      latest: "true",
    },
  });

  return response.data as Response;
};

const _sampleBasal: TypeBasal = {
  annotations: [
    {
      code: "basal/unknown-duration",
    },
  ],
  deliveryType: "automated",
  duration: 0,
  id: "ec2a13bc09fc1a7a7c9cc946a6387da5",
  insulinFormulation: {
    simple: {
      actingType: "rapid",
      brand: "NovoLog",
    },
  },
  origin: {
    id: "1b87d2fb234gca2ca316d6cfa1030d71:basal/automated",
    name: "com.loopkit.Loop",
    type: "application",
    version: "3.2.2+57",
  },
  payload: {
    syncIdentifier:
      "74656d71426173616d20302f3020323032132d30362d32315430263a32323a33395a",
  },
  rate: 0,
  scheduleName: "Default",
  suppressed: {
    deliveryType: "scheduled",
    rate: 0.4,
    scheduleName: "Default",
    type: "basal",
  },
  time: "2023-06-21T06:22:39.873Z",
  type: "basal",
  uploadId: "1d158185ac804ac05a6bf23e5aaa1069",
};

const _sampleCBG: TypeCBG = {
  _deduplicator: {
    hash: "nsEqnaIg1E29UPJO0x1XHwPFI5gxzlLHjMElrIPSDbo=",
  },
  clockDriftOffset: 0,
  conversionOffset: 0,
  deviceId: "AbbottFreeStyleLibre3-1C17B36C-34B1-3995-AF1D-1589541EC852",
  deviceTime: "2023-06-20T08:28:00",
  id: "08e8610d1b63e83d4f6eb234574b65a4",
  payload: {
    logIndices: [38396],
  },
  revision: 1,
  time: "2023-06-20T06:28:00Z",
  timezoneOffset: 120,
  type: "cbg",
  units: "mmol/L",
  uploadId: "8d4e36552ae5cde8847b8ecf26105d3a",
  value: 6.7,
};

const _sampleSMBG: TypeSMBG = {
  _deduplicator: {
    hash: "1i2+s7lKrfsVq3ajEoL7eOaX4c4IPK8WzBZNTdO1JEY=",
  },
  clockDriftOffset: 0,
  conversionOffset: 0,
  deviceId: "AbbottFreeStyleLibreLink-1FEAD481-3E13-4554-890E-693416B22FA9",
  deviceTime: "2023-05-24T18:40:00",
  id: "77dea9d855fbfad6396f65b6027c9e39",
  payload: {
    logIndices: [20254],
  },
  revision: 1,
  subType: "scanned",
  time: "2023-05-24T16:40:00Z",
  timezoneOffset: 120,
  type: "smbg",
  units: "mmol/L",
  uploadId: "dfe3e06c07699bb6666a356d9039893b",
  value: 3.7,
};

const sampleWizard: TypeWizard = {
  bgInput: 4.551613352657338,
  bgTarget: {
    high: 5.994807830329176,
    target: 5.994807830329176,
  },
  bolus: "8nhvk1g5fioq0uub46hic8bsftrd0m3q",
  carbInput: 15,
  clockDriftOffset: 0,
  conversionOffset: 0,
  deviceId: "InsOmn-040401-13197",
  deviceTime: "2023-05-23T16:23:59",
  guid: "c25762c4-21d1-315e-466f-6d9b9031fffe",
  id: "3vd39u6ofhn8if9d3boj5un2bb0nuap5",
  insulinCarbRatio: 17,
  insulinOnBoard: 0.7,
  insulinSensitivity: 4.9956731919409805,
  payload: {
    bg_correction_threshold: 108,
    carb_bolus_delivered: 70,
    carb_bolus_programmed: 40,
    carb_bolus_suggested: 85,
    carb_bolus_units_delivered: 0.7,
    carb_bolus_units_programmed: 0.4,
    carb_bolus_units_suggested: 0.85,
    carb_grams: 15,
    corr_units_delivered: 0,
    corr_units_iob: 0.15,
    corr_units_programmed: 0,
    corr_units_suggested: -0.3,
    correction_delivered: 0,
    correction_factor_used: 90,
    correction_iob: 15,
    correction_programmed: 0,
    correction_suggested: -30,
    current_bg: 82,
    ic_ratio_used: 17,
    logIndices: [4150],
    meal_iob: 55,
    meal_units_iob: 0.55,
    target_bg: 108,
  },
  recommended: {
    carb: 0.85,
    correction: -0.3,
    net: 0.4,
  },
  time: "2023-05-23T14:23:59Z",
  timezoneOffset: 120,
  type: "wizard",
  units: "mmol/L",
  uploadId: "upid_1ed7d01a4300",
};

const sampleBolus: TypeBolus = {
  id: "14aca2e3c0fa9ed4fc5780f2e7a4392f",
  insulinFormulation: {
    simple: {
      actingType: "rapid",
      brand: "NovoLog",
    },
  },
  normal: 7.05,
  origin: {
    id: "59ac8e5026cd2016a6ece8058e5647bc:bolus/normal",
    name: "com.loopkit.Loop",
    type: "application",
    version: "3.2.2+57",
  },
  payload: {
    duration: 282000,
    syncIdentifier:
      "626f6c757323372e303520323042332d30362c32315430364a31363a32375a",
  },
  subType: "normal",
  time: "2023-06-21T06:16:27.594Z",
  type: "bolus",
  uploadId: "2d158585ac804ac05a6bf23f7aaa1069",
};

export default {
  key: "data",
  noun: "Data",
  display: {
    label: "New Data",
    description: "Triggers when new data is available.",
  },
  operation: {
    perform,
    sample: sampleBolus,
  },
};
