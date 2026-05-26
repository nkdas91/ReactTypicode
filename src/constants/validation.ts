export const VALIDATION = {
  USER: {
    NAME: {
      MIN: 2,
      MAX: 50,
    },

    USERNAME: {
      MIN: 3,
      MAX: 30,
      REGEX: /^[a-zA-Z0-9_]+$/,
    },

    PHONE: {
      MIN: 10,
      MAX: 15,
      REGEX: /^[0-9+\-\s()]+$/,
    },

    WEBSITE: {
      MAX: 100,
    },

    ADDRESS: {
      SUITE_MAX: 50,
      STREET_MAX: 100,
      CITY_MAX: 50,
      ZIPCODE_MAX: 12,
      ZIPCODE_REGEX: /^[a-zA-Z0-9-\s]+$/,
    },
  },

  POST: {
    TITLE: {
      MIN: 3,
      MAX: 120,
    },
    BODY: {
      MIN: 10,
      MAX: 5000,
    },
  },

  COMMENT: {
    NAME: {
      MIN: 2,
      MAX: 50,
    },

    BODY: {
      MIN: 5,
      MAX: 1000,
    },
  },
};
