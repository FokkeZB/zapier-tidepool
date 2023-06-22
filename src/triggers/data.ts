// TODO: Use starttime for cursor polling

import { Bundle, ZObject } from "zapier-platform-core";
import { Data, Type } from "../data/types";
import { samples } from "../data/samples";

type Response = Array<Data>;

interface InputFields {
  types?: Array<Type>;
}

const perform = async (
  z: ZObject,
  bundle: Bundle<InputFields>
): Promise<Array<Data>> => {
const response = await z.request({
    method: "GET",
    url: `/data/${bundle.authData.userid}`,
    params: {
      latest: "true",
      types: types
    },
  });

  const data = response.data as Response;

  const types = bundle.inputData.types;

  if (!Array.isArray(types) || types.length === 0) {
    return data;
  }

  return data.filter(({ type }) => types.includes(type));
};

const choices: Array<{ label: string; sample: string; value: Type }> = [
  {
    label: "Basal",
    value: "basal",
    sample: "basal",
  },
  {
    label: "Bolus",
    value: "bolus",
    sample: "bolus",
  },
  {
    label: "CBG",
    value: "cbg",
    sample: "cbg",
  },
  {
    label: "SMBG",
    value: "smbg",
    sample: "smbg",
  },
  {
    label: "Wizard",
    value: "wizard",
    sample: "wizard",
  },
];

export default {
  key: "data",
  noun: "Data",
  display: {
    label: "New Data",
    description: "Triggers when new data is available.",
  },
  operation: {
    inputFields: [
      {
        key: "types",
        type: "string",
        label: "Types of data to trigger on",
        list: true,
        required: false,
        choices,
      },
    ],
    perform,
    sample: samples.bolus,
  },
};