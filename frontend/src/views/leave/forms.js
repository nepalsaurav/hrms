import * as yup from "yup";
import LeaveHalfDay from "@/components/LeaveHalfDay.vue";
import CountLeaveDays from "@/components/CountLeaveDays.vue";

export const formDetails = [
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
    name: "leave_days",
    label: "Leave Day/ Balance Leave",
    type: "custom_component",
    component: CountLeaveDays
  },
  {
    name: "leave_type",
    label: "Leave Type",
    collection: "leave_type",
    labelField: "name",
    firstOption: "select leave type",
    type: "relational_field_select",
    required: true,
  },

  {
    name: "is_half",
    label: "Half Day",
    type: "bool",
  },
  {
    name: "half_day_type",
    label: "Half Day Type",
    type: "custom_component",
    component: LeaveHalfDay
  },

  {
    name: "status",
    label: "Status",
    type: "select",
    required: false,
    options: [
      {
        label: "Pending",
        value: "pending",
      },
      {
        label: "Accepted",
        value: "accepted",
      },
      {
        label: "Rejected",
        value: "rejected",
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
    required: true
  },
];

export const validationSchema = yup.object().shape({
  employee: yup.string().required("employee is a required field"),
  reasons: yup.string().required("reasons is a requred field"),
  leave_from: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format yyyy-mm-dd")
    .required("leave_from is a required field"),
  leave_to: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format yyyy-mm-dd")
    .required("leave_to is a required field")
    .test(
      "is-greater",
      "leave_to must be equal or greater than leave_from",
      function (value) {
        const { leave_from } = this.parent;
        return !leave_from || !value || new Date(value) >= new Date(leave_from);
      },
    ),
  is_half: yup
    .boolean()
    .test(
      "is-half-logic",
      "is_half must be false if leave_to is greater than leave_from",
      function (value) {
        const { leave_from, leave_to } = this.parent;
        if (
          leave_from &&
          leave_to &&
          new Date(leave_to) > new Date(leave_from)
        ) {
          return value === false;
        }
        return true; // Allow any value if the condition is not met
      },
    ),
    half_day_type: yup.string().test(
      "half_day_type",
      "Half day type is required when 'is_half' is selected",
      function (value) {
        const { is_half } = this.parent;
        if (is_half && value === undefined) {
          return false; // return false to trigger validation error
        }
        return true; // otherwise, validation passes
      }
    )
});
