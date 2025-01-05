import * as yup from "yup";

export const validationSchemaSingle = yup.object().shape({
  employee: yup.string().required("employee is a required field"),
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
