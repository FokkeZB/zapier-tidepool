// TODO: Use starttime for cursor polling

import { Bundle, ZObject } from "zapier-platform-core";
import { Data, Type } from "../data/types";
import { samples } from "../data/samples";

type Response = Array<Data>;

interface InputFields {
  types?: Array<Type>;
  subtypes?: Array<string>;
}

const perform = async (
  z: ZObject,
  bundle: Bundle<InputFields>
): Promise<Array<Data>> => {
  const startDate = new Date();
  startDate.setHours(startDate.getHours() - 12);
  const startDateStr = startDate.toISOString();

  const params: Record<string, string> = {
    startDate: startDateStr,
  };

  if (
    Array.isArray(bundle.inputData.types) &&
    bundle.inputData.types.length > 0
  ) {
    params.type = bundle.inputData.types.join(",");
  }

  if (
    Array.isArray(bundle.inputData.subtypes) &&
    bundle.inputData.subtypes.length > 0
  ) {
    params.subtype = bundle.inputData.subtypes.join(",");
  }

  const response = await z.request({
    method: "GET",
    url: `/data/${bundle.authData.userid}`,
    params,
  });

  return response.data as Response;
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
        helpText:
          "See [docs](https://tidepool.stoplight.io/docs/tidepool-api/3b03cf89d4c83-diabetes-data-types).",
        list: true,
        required: false,
        choices,
      },
      {
        key: "subtypes",
        type: "string",
        label: "Subtypes of data to trigger on",
        helpText:
          "See [docs](https://tidepool.stoplight.io/docs/tidepool-api/3b03cf89d4c83-diabetes-data-types).",
        list: true,
        required: false,
      },
    ],
    perform,
    sample: samples.bolus,
  },
};
