import { version as platformVersion } from "zapier-platform-core";

import Authentication from "./authentication";
import Data from "./triggers/data";
import Note from "./triggers/note";
import User from "./triggers/user";
import Upload from "./actions/upload"; // Import the new upload action

const { version } = require("../package.json");

export default {
  version,
  platformVersion,
  authentication: Authentication.authentication,
  beforeRequest: [Authentication.beforeRequest],
  afterResponse: [Authentication.afterResponse],
  triggers: {
    [Data.key]: Data,
    [Note.key]: Note,
    [User.key]: User,
  },
  actions: {
    [Upload.key]: Upload, // Add the new upload action to the list of actions
  },
};