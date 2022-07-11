parasails.registerPage("teacher", {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    thisActionSelected: 1,

    // Form data
    formData: {
      /* … */
    },

    // For tracking client-side validation errors in our form.
    // > Has property set to `true` for each invalid property in `formData`.
    formErrors: {
      /* … */
    },

    // A set of validation rules for our form.
    // > The form will not be submitted if these are invalid.
    formRules: {
      nickName: { required: true },
      fullName: { required: true },
      emailAddress: { required: true, isEmail: true },
      phoneNumber: { required: true },
      address: { required: true },
    },

    // Syncing / loading state
    syncing: false,
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {},
  mounted: async function () {
    // Hide -> ID
    let table = $("#datatable").DataTable({
      pageLength: 100,
      order: [[2, "asc"]],
      scrollX: true,
      scrollY: true,

      columnDefs: [
        {
          targets: [0],
          visible: false,
          searchable: false,
        },
        {
          targets: [1],
          width: "15%",
        },
        {
          targets: [2],
          width: "25%",
        },
        {
          targets: [3],
          width: "17%",
        },
        {
          targets: [4],
          width: "13%",
        },
        {
          targets: [5],
          width: "30%",
        },
        {
          targets: [6],
          orderable: false,
          searchable: false,
          width: 150,
        },
      ],
    });
    table.clear().draw();
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    prepareInsert: async function () {
      this.thisActionSelected = 1;
      $("#nick-name").val("");
      $("#full-name").val("");
      $("#email-address").val("");
      $("#phone-number").val("");
      $("#addess").val("");

      $("#btnCreateOrEdit").text("Create");
      $("#titleCreateOrEdit").text("Create Teacher");
      $("#create-modal").modal({
        show: true,
      });
    },

    doCancel: async function () {
      $("#create-modal").modal("toggle");
    },

    submittedForm: async function () {
      $("#create-modal").modal("toggle");
      this.syncing = true;
      window.location = '/teacher';
    },
  },
});
