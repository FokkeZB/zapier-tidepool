import { Bundle, ZObject } from "zapier-platform-core";

const perform = async (
  z: ZObject,
  bundle: Bundle
): Promise<any> => {
  const payload = {
    field1: bundle.inputData.field1,
    field2: bundle.inputData.field2,
    // Add more fields as needed
  };

  const response = await z.request({
    method: "POST",
    url: "/data/{{bundle.authData.userid}}",
    body: payload,
  });

  return response.data;
};

const upload = {
  key: "upload",
  noun: "Upload",
  display: {
    label: "Upload Data",
    description: "Uploads data to the Tidepool API.",
  },
  operation: {
inputFields: [
  {
    key: "field1",
    type: "string",
    label: "Field 1",
    required: true,
  },
  {
    key: "field2",
    type: "string",
    label: "Field 2",
    required: true,
  },
  // Add more fields as needed
]
    perform,
    sample: {
      success: true,
      message: "Data uploaded successfully",
    },
  },
};

export default upload;