export const listHeader = [
  {
    name: "sn",
    label: "SN",
    type: "serial_number",
  },
  {
    name: "name",
    label: "Name",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    type: "text",
  },
];

export const filterList = [
  {
    name: "text_search",
    label: "Search",
    type: "text_search",
    fields: ["name", "email"],
    placeholder: "search",
  },
];

export const formList = [
  {
    name: "email",
    label: "Email Address",
    placeholder: "e.g., john.doe@example.com",
    type: "email",
    required: true,
    size: "is-4",
  },
  {
    name: "name",
    label: "Name",
    placeholder: "eg. John Doe",
    type: "text",
    required: true,
    size: "is-4",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "password",
    type: "password",
    required: true,
    size: "is-4",
  },
  {
    name: "password_confirm",
    label: "Password confirm",
    placeholder: "password confirm",
    type: "password",
    required: true,
    size: "is-4",
  },
];
