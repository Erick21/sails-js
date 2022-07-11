parasails.registerPage("teacher", {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
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
      teacherId: { required: false },
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
          width: "10%",
        },
        {
          targets: [2],
          width: "20%",
        },
        {
          targets: [3],
          width: "15%",
        },
        {
          targets: [4],
          width: "10%",
        },
        {
          targets: [5],
          width: "45%",
        },
        {
          targets: [6],
          orderable: false,
          searchable: false,
          width: 200,
        },
      ],
    });

    table.clear();
    this.listData.forEach(function (eachData) {
      let thisDatatablesAppend = "";
      thisDatatablesAppend = thisDatatablesAppend + "<tr>";
      thisDatatablesAppend =
        thisDatatablesAppend + "<td>" + eachData.teacher_id + "</td>";
      thisDatatablesAppend =
        thisDatatablesAppend + "<td>" + eachData.nick_name + "</td>";
      thisDatatablesAppend =
        thisDatatablesAppend + "<td>" + eachData.full_name + "</td>";
      thisDatatablesAppend =
        thisDatatablesAppend + "<td>" + eachData.email_address + "</td>";
      thisDatatablesAppend =
        thisDatatablesAppend + "<td>" + eachData.phone_number + "</td>";
      thisDatatablesAppend =
        thisDatatablesAppend + "<td>" + eachData.address + "</td>";
      thisDatatablesAppend = thisDatatablesAppend + "<td>";
      thisDatatablesAppend =
        thisDatatablesAppend +
        '<button class="btn btn-outline-info ml-2" id="btn-edit-datatable">Edit</button>';
      thisDatatablesAppend =
        thisDatatablesAppend +
        '<button class="btn btn-outline-secondary ml-2" id="btn-delete-datatable">Delete</button>';
      thisDatatablesAppend = thisDatatablesAppend + "</td>";
      thisDatatablesAppend = thisDatatablesAppend + "</td>";
      thisDatatablesAppend = thisDatatablesAppend + "</tr>";

      table.row.add($(thisDatatablesAppend));
    });
    table.draw();

    let that = this;

    $("#datatable").on(
      "mousedown.edit",
      "td #btn-edit-datatable",
      function (e) {
        e.preventDefault();
        var $row = $(this).closest("tr").off("mousedown");
        var $tds = $row.find("td").not(":last");

        $.each($tds, function (i, el) {
          if (i < $tds.length) {
            var txt = $(this).text();
            if (i == 0) {
              $("#nick-name").val(txt);
              that.formData.nickName = txt;
            } else if (i == 1) {
              $("#full-name").val(txt);
              that.formData.fullName = txt;
            } else if (i == 2) {
              $("#email-address").val(txt);
              that.formData.emailAddress = txt;
            } else if (i == 3) {
              $("#phone-number").val(txt);
              that.formData.phoneNumber = txt;
            } else if (i == 4) {
              $("#addess").val(txt);
              that.formData.address = txt;
            }
          }
        });

        var data = table.row($(this).closest("tr")).data();
        that.formData.teacherId = data[0];

        $("#btnCreateOrEdit").text("Update");
        $("#titleCreateOrEdit").text("Update Teacher");
        $("#create-modal").modal({
          show: true,
        });
      }
    );

    $("#datatable").on(
      "mousedown.edit",
      "td #btn-delete-datatable",
      function (e) {
        e.preventDefault();

        var data = table.row($(this).closest("tr")).data();
        that.formData.teacherId = data[0];

        $("#delete-modal").modal({
          show: true,
        });
      }
    );
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    prepareInsert: async function () {
      this.formData.teacherId = "";
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

    doCancelCreate: async function () {
      $("#create-modal").modal("toggle");
    },

    doCancelDelete: async function () {
      $("#delete-modal").modal("toggle");
    },

    submittedFormCreate: async function () {
      $("#create-modal").modal("toggle");
      this.syncing = true;
      window.location = "/teacher";
    },

    submittedFormDelete: async function () {
      $("#delete-modal").modal("toggle");
      this.syncing = true;
      window.location = "/teacher";
    },
  },
});
