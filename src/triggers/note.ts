// TODO: Use starttime for cursor polling

import { Bundle, ZObject } from "zapier-platform-core";

interface Message {
  id: string;
  guid: string;
  parentmessage: null;
  userid: string;
  groupid: string;
  timestamp: string;
  createdtime: string;
  messagetext: string;
  user: {
    fullName: string;
  };
}

interface Response {
  messages: Message[];
}

const perform = async (z: ZObject, bundle: Bundle): Promise<Array<Message>> => {
  const response = await z.request({
    method: "GET",
    url: `/message/notes/${bundle.authData.userid}`,
  });

  const data = response.data as Response;

  return data.messages;
};

export default {
  key: "note",
  noun: "Note",
  display: {
    label: "New Note",
    description: "Triggers when a new note is created.",
  },
  operation: {
    perform,
    sample: {
      id: "148d3fe1e361c83g325ef595",
      guid: "c15ed6cf-5420-1a7g-8f68-c45338c4daff",
      parentmessage: null,
      userid: "5d509deb6b",
      groupid: "5d509deb6b",
      timestamp: "2023-06-16T16:45:14.000Z",
      createdtime: "2023-06-17T05:08:49+00:00",
      messagetext: "Some note",
      user: {
        fullName: "Jill Jellyfish",
      },
    },
  },
};
