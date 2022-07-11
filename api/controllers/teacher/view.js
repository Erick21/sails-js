module.exports = {


  friendlyName: 'View teacher',


  description: 'Display "Teacher" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/teacher'
    }

  },


  fn: async function () {

    // Respond with view.
    return {};

  }


};
