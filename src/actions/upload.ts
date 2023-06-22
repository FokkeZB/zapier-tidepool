import { Bundle, ZObject } from "zapier-platform-core";

const perform = async (
  z: ZObject,
  bundle: Bundle
): Promise<any> => {
  // Start a session
  const loginResponse = await z.request({
    method: "POST",
    url: "/auth/login",
    body: {
      email: bundle.authData.email,
      password: bundle.authData.password
    }
  });
  const sessionToken = loginResponse.data.token;

  // Add the session token to the request headers
  const headers = {
    ...request.headers,
    "X-Tidepool-Session-Token": sessionToken
  };

  const payload = {
    field1: bundle.inputData.field1,
    field2: bundle.inputData.field2,
    // Add more fields as needed
  };
  // Upload the data
  const uploadResponse = await z.request({
    method: "POST",
    url: "/data/{{bundle.authData.userid}}",
    body: payload,
    headers: headers
  });
  // Close the session
  await z.request({
    method: "POST",
    url: "/auth/logout",
    headers: headers
  });

  return uploadResponse.data;
};
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