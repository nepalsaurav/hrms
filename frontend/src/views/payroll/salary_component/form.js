export const formDetails = [
  {
    name: "name",
    label: "Name",
    placeholder: "eg. Basic",
    required: true,
    type: "text",
    size: "is-4",
  },
  {
    name: "abbreviation",
    label: "Abbreviation",
    placeholder: "eg. B for Basic",
    type: "text",
    required: true,
    size: "is-4",
  },
  {
    name: "type",
    label: "Type",
    type: "select",
    options: [
      {
        label: "Earning",
        value: "Earning",
      },
      {
        label: "Deduction",
        value: "Deduction",
      },
    ],
    required: true,
    size: "is-4",
  },
  {
    name: "depends_on_payment_days",
    label: "Depends on payment days",
    type: "bool",
    size: "is-4",
  },
  {
    name: "is_tax_applicable",
    label: "Is tax applicable",
    type: "bool",
    size: "is-4",
  },
  {
    name: "round_to_the_nearest_integer",
    label: "Round to the nearest integer",
    type: "bool",
    size: "is-4",
  },
  {
    name: "do_not_include_in_total",
    label: "Do not include in total",
    type: "bool",
    size: "is-4",
  },
  {
    name: "formula",
    label: "Condition and formula",
    type: "formula",
    size: "is-6",
  },
];
