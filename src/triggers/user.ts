export default {
  key: "user",
  noun: "User",
  display: {
    label: "New User",
    description: "Triggers when given access to a new user account.",
  },
  operation: {
    perform: {
      url: "/metadata/users/{{bundle.authData.userid}}/users",
    },
    sample: {
      emailVerified: true,
      emails: ["demo+jill@tidepool.org"],
      termsAccepted: "2017-08-03T12:19:54-07:00",
      userid: "5d509deb6b",
      username: "demo+jill@tidepool.org",
      trustorPermissions: {
        view: {},
      },
      profile: {
        fullName: "Jill Jellyfish",
        patient: {
          birthday: "2000-01-01",
          diagnosisDate: "2000-01-01",
          targetDevices: ["omnipod", "dexcom"],
          targetTimezone: "US/Pacific",
        },
      },
    },
  },
};
