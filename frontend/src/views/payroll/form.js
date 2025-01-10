import * as yup from "yup";


export const validationSchemaSingle = yup.object().shape({
 
  from_date: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format yyyy-mm-dd")
    .required("leave_from is a required field"),
  to_date: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format yyyy-mm-dd")
    .required("leave_to is a required field")
    .test(
      "is-greater",
      "leave_to must be equal or greater than leave_from",
      function (value) {
        const { from_date } = this.parent;
        return !from_date || !value || new Date(value) >= new Date(from_date);
      },
    ),
});





export function formList(type) {

  if (type === "single") {
    return [
      {
        name: "employee",
        label: "Employee",
        collection: "employee",
        labelField: "full_name",
        firstOption: "select employee",
        type: "relational_field_select",
        isCombinedField: true,
        combinedFields: ["first_name", "middle_name", "last_name"],
        required: true,
      },
      {
        name: "from_date",
        label: "From Date",
        type: "date",
        placeholder: "2001-01-01",
      },
      {
        name: "to_date",
        label: "To Date",
        type: "date",
        placeholder: "2001-01-01",
      },
    ];
  } else if (type === "bulk") {
    return [
      {
        name: "from_date",
        label: "From Date",
        type: "date",
        placeholder: "2001-01-01",
      },
      {
        name: "to_date",
        label: "To Date",
        type: "date",
        placeholder: "2001-01-01",
      },
    ];
  }
  return [];
}



