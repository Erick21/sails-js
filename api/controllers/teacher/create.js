module.exports = {
  friendlyName: "Create/ update teacher",

  description: "Create/ update teacher.",

  extendedDescription: `This creates/ updates a teacher record in the database`,

  inputs: {
    teacherId: {
      required: false,
      type: "string",
    },

    nickName: {
      required: true,
      type: "string",
    },

    fullName: {
      required: true,
      type: "string",
    },

    emailAddress: {
      required: true,
      type: "string",
      isEmail: true,
    },

    phoneNumber: {
      required: true,
      type: "string",
    },

    address: {
      required: true,
      type: "string",
    },
  },

  exits: {
    success: {
      description: "Teacher was created/ updated successfully.",
    },
  },

  fn: async function (
    { teacherId, nickName, fullName, emailAddress, phoneNumber, address },
    exits
  ) {
    if (teacherId) {
      // Update
      sails.config.custom.dynamodb.updateItem(
        {
          TableName: sails.config.custom.TABLE_NAME_TEACHER,
          ExpressionAttributeNames: {
            "#nick_name": "nick_name",
            "#full_name": "full_name",
            "#email_address": "email_address",
            "#phone_number": "phone_number",
            "#address": "address",
            "#date_updated": "date_updated",
          },
          ExpressionAttributeValues: {
            ":nick_name": {
              S: nickName,
            },
            ":full_name": {
              S: fullName,
            },
            ":email_address": {
              S: emailAddress,
            },
            ":phone_number": {
              S: phoneNumber,
            },
            ":address": {
              S: address,
            },
            ":date_updated": {
              S: new Date().toString(),
            },
          },
          Key: {
            teacher_id: {
              S: teacherId,
            },
          },
          UpdateExpression:
            "SET #nick_name = :nick_name, #full_name = :full_name, #email_address = :email_address, #phone_number = :phone_number, #address = :address, #date_updated = :date_updated",
        },
        function (err, dataUpdateItem) {
          return exits.success();
        }
      );
    } else {
      // Create new
      const { v4: uuidv4 } = require("uuid");

      sails.config.custom.dynamodb.putItem(
        {
          TableName: sails.config.custom.TABLE_NAME_TEACHER,
          Item: {
            teacher_id: {
              S: uuidv4(),
            },
            nick_name: {
              S: nickName,
            },
            full_name: {
              S: fullName,
            },
            email_address: {
              S: emailAddress.toLowerCase(),
            },
            phone_number: {
              S: phoneNumber,
            },
            address: {
              S: address,
            },
            date_created: {
              S: new Date().toString(),
            },
          },
        },
        function (err, dataPutItem) {
          return exits.success();
        }
      );
    }
  },
};
