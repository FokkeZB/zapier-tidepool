import { version as platformVersion } from "zapier-platform-core";

import Authentication from "./authentication";
import Note from "./triggers/note";
import User from "./triggers/user";

const { version } = require("../package.json");

export default {
  version,
  platformVersion,
  authentication: Authentication.authentication,
  beforeRequest: [Authentication.beforeRequest],
  triggers: {
    [Note.key]: Note,
    [User.key]: User,
  },
};
