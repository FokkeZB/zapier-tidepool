import { ZObject, Bundle, HttpResponse } from 'zapier-platform-core';

const perform = async (z: ZObject, bundle: Bundle): Promise<HttpResponse> => {
  const response = await z.request({
    method: 'POST',
    url: `https://${bundle.authData.region}.tidepool.org/v1/data`,
    body: bundle.inputData,
  });

  return response;
};

export default {
  key: 'uploadData',
  noun: 'Data',
  display: {
    label: 'Upload Data',
    description: 'Uploads data to the Tidepool API.',
  },
  operation: {
    perform,
    inputFields: [
      {
        key: 'data',
        type: 'string',
        label: 'Data',
        required: true,
      },
    ],
  },
};