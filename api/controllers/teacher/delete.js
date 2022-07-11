module.exports = {
  friendlyName: "Delete teacher",

  description: "Delete teacher.",

  extendedDescription: `This deletes a teacher record in the database`,

  inputs: {
    teacherId: {
      required: true,
      type: "string",
    },
  },

  exits: {
    success: {
      description: "Teacher was deleted successfully.",
    },
  },

  fn: async function ({ teacherId }, exits) {
    sails.config.custom.dynamodb.deleteItem(
      {
        TableName: sails.config.custom.TABLE_NAME_TEACHER,
        Key: {
          teacher_id: {
            S: teacherId,
          },
        },
      },
      function (err, dataPutItem) {
        return exits.success();
      }
    );
  },
};
