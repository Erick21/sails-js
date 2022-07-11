module.exports = {
  friendlyName: "View teacher",

  description: 'Display "Teacher" page.',

  exits: {
    success: {
      viewTemplatePath: "pages/teacher",
    },
  },

  fn: async function ({}, exits) {
    let listData = [];
    let paramObject = {
      TableName: sails.config.custom.TABLE_NAME_TEACHER,
    };
    sails.config.custom.docClient.scan(paramObject, function (err, data) {
      if (err) return { listData };
      else {
        listData = data.Items;
        return exits.success({ listData });
      }
    });
  },
};
