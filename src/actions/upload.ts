import { Bundle, ZObject } from "zapier-platform-core";

const perform = async (
  z: ZObject,
  bundle: Bundle
): Promise<any> => {
  const response = await z.request({
    method: "POST",
    url: "/data/{{bundle.authData.userid}}",
    body: bundle.inputData,
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
        key: "data",
        type: "string",
        label: "Data to upload",
        required: true,
      },
    ],
    perform,
    sample: {
      success: true,
      message: "Data uploaded successfully",
    },
  },
};

export default upload;