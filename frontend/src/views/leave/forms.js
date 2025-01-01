export const formDetails = [
  {
    name: "employee",
    label: "Employee",
    collection: "employee",
    labelField: "first_name",
    firstOption: "select employee",
    type: "relational_field_select",
    isCombinedField: true,
    combinedFields: ["first_name", "middle_name", "last_name"],
    required: true,
  },
  {
    name: "leave_from",
    label: "Leave From",
    type: "date",
    required: true,
    placeholder: "1900-01-01",
  },
  {
    name: "leave_to",
    label: "Leave To",
    type: "date",
    required: true,
    placeholder: "1900-01-01",
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: false,
    options: [
      {
        label: "Select Status",
        value: "",
      },
      {
        label: "Pending",
        value: "pending",
      },
      {
        label: "Accept",
        value: "accept",
      },
      {
        label: "Reject",
        value: "reject",
      },
    ],
  },
  {
    name: "file",
    label: "File",
    type: "file",
    required: false,
  },
  {
    name: "reasons",
    label: "Reasons",
    type: "rich_text",
  },
];
