module.exports = {
  friendlyName: "Create teacher",

  description: "Create a new user teacher.",

  extendedDescription: `This creates a new teacher record in the database`,

  inputs: {
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
      description: "New teacher was created successfully.",
    },
  },

  fn: async function (
    { nickName, fullName, emailAddress, phoneNumber, address },
    exits
  ) {
    let newEmailAddress = emailAddress.toLowerCase();
    console.log("========= nickName:", nickName);
    console.log("========= fullName:", fullName);
    console.log("========= emailAddress:", emailAddress);
    console.log("========= phoneNumber:", phoneNumber);
    console.log("========= address:", address);
    return exits.success();
  },
};
