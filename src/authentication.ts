import {
  Bundle,
  HttpRequestOptions,
  HttpResponse,
  ZObject,
} from "zapier-platform-core";

const perform = async (
  z: ZObject,
  bundle: Bundle
): Promise<{
  token: string;
  userid: string;
}> => {
  const response = await z.request({
    method: "POST",
    url: "/auth/login",
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${bundle.authData.email}:${bundle.authData.password}`
      ).toString("base64")}`,
    },
  });

  const data = response.data as {
    emailVerified: boolean;
    emails: string[];
    roles: string[]; // ["patient", "default-roles-tidepool"];
    termsAccepted: string; // "2023-05-23T06:51:55+00:00";
    userid: string; // "a319d289-1395-4280-b245-d232ac29ad78";
    username: string; // "user@example.com"
  };

  // Incorrectly typed by ZObject
  const token = (response.headers as unknown as Map<string, string>).get(
    "x-tidepool-session-token"
  );

  if (!token) {
    throw new Error("Did not receive a session token from Tidepool.");
  }

  const authData = {
    token,
    userid: data.userid,
  };

  return authData;
};

const authentication = {
  type: "session",
  fields: [
    {
      key: "region",
      type: "string",
      required: true,
      default: "api",
      choices: [
        {
          label: "app.tidepool.org",
          value: "api",
          sample: "api",
        },
        {
          label: "int-app.tidepool.org",
          value: "int-api",
          sample: "int-api",
        },
      ],
      helpText: "Where do you log in to Tidepool?",
    },
    {
      label: "Email Address",
      key: "email",
      type: "string",
      required: true,
    },
    {
      key: "password",
      type: "password",
      required: true,
    },
    {
      key: "token",
      type: "string",
      computed: true,
      required: false,
    },
    {
      key: "userid",
      type: "string",
      computed: true,
      required: false,
    },
  ],
  sessionConfig: {
    perform,
  },
  test: {
    url: "/metadata/users/{{bundle.authData.userid}}/users",
  },
  connectionLabel: "{{email}}",
};

const beforeRequest = (
  request: HttpRequestOptions,
  _z: ZObject,
  bundle: Bundle
) => {
  const absoluteURL = new URL(
    request.url ?? "/",
    `https://${bundle.authData.region}.tidepool.org`
  );

  request.url = absoluteURL.href;
  if (request.method === 'POST' && absoluteURL.pathname === '/v1/data') {
    request.headers = {
      ...request.headers,
      "X-Tidepool-Session-Token": bundle.authData.token,
      'Content-Type': 'application/json',
    };
    request.body = JSON.stringify(request.body);
  } else if (absoluteURL.pathname !== "/auth/login" && bundle.authData.token) {
    request.headers = {
      ...request.headers,
      "X-Tidepool-Session-Token": bundle.authData.token,
    };
  }

  return request;
};
};

const afterResponse = (response: HttpResponse, z: ZObject) => {
  if (response.status === 403) {
    throw new z.errors.RefreshAuthError("Session token expired.");
  }

  return response;
};

export default {
  authentication,
  beforeRequest,
  afterResponse,
};