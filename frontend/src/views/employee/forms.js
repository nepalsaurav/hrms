import * as yup from "yup";

export const formDetails = {
  personal_details: [
    {
      name: "first_name",
      label: "First Name",
      placeholder: "e.g., John",
      type: "text",
      required: true,
      content: "",
    },
    {
      name: "middle_name",
      label: "Middle Name",
      placeholder: "e.g., Doe",
      type: "text",
      required: false,
    },
    {
      name: "last_name",
      label: "Last Name",
      placeholder: "e.g., Smith",
      type: "text",
      required: true,
    },
    {
      name: "date_of_birth_ad",
      label: "Date of Birth (AD)",
      placeholder: "1990-01-01",
      type: "date",
      required: false,
    },
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: [
        {
          value: "",
          label: "Select Marital Status",
        },
        {
          value: "Male",
          label: "Male",
        },
        {
          value: "Female",
          label: "Female",
        },
        {
          value: "Other",
          label: "Other",
        },
      ],

      required: false,
    },
    {
      name: "marital_status",
      label: "Marital Status",
      type: "select",
      options: [
        {
          value: "",
          label: "Select Marital Status",
        },
        {
          value: "Single",
          label: "Single",
        },
        {
          value: "Married",
          label: "Married",
        },
        {
          value: "Divorced",
          label: "Divorced",
        },
        {
          value: "Widowed",
          label: "Widowed",
        },
      ],

      required: false,
    },
    {
      name: "nationality",
      label: "Nationality",
      placeholder: "e.g., Nepali",
      type: "text",
      required: false,
    },
    {
      name: "photo",
      label: "Profile Picture",
      type: "file",
      required: false,
    },
  ],
  contact_details: [
    {
      name: "contact_number",
      label: "Contact Number",
      placeholder: "9876543210",
      type: "text",
      required: false,
    },
    {
      name: "email",
      label: "Email Address",
      placeholder: "e.g., john.doe@example.com",
      type: "email",
      required: false,
    },
    {
      name: "address",
      label: "Address",
      placeholder: "e.g., Kathmandu, Nepal",
      type: "textarea",
      required: false,
    },
    {
      name: "emergency_contact",
      label: "Emergency Contact",
      placeholder: "9876543210",
      type: "text",
      required: false,
    },
  ],
  job_details: [
    {
      name: "employee_id",
      label: "Employee ID",
      placeholder: "e.g., EMP12345",
      type: "text",
      required: false,
    },
    {
      name: "designation",
      label: "Designation",
      collection: "designation",
      labelField: "name",
      firstOption: "e.g., Software Engineer",
      type: "relational_field_select",
      required: false,
    },
    {
      name: "salary_structure",
      label: "Salary Structure",
      collection: "salary_structure",
      labelField: "name",
      firstOption: "select salary structure",
      type: "relational_field_select",
      required: false,
    },
    {
      name: "leave_type",
      label: "Leave Type",
      collection: "leave_type",
      labelField: "name",
      firstOption: "select leave type",
      type: "relational_field_select",
      required: false,
      multiple: true,
    },
    {
      name: "department",
      label: "Department",
      collection: "department",
      labelField: "name",
      firstOption: "Select Department",
      type: "relational_field_select",
      required: false,
    },
    {
      name: "joining_date",
      label: "Joining Date",
      placeholder: "e.g., 2024-01-01",
      type: "date",
      required: false,
    },
    {
      name: "employment_type",
      label: "Employment Type",
      type: "select",
      options: [
        {
          value: "",
          label: "Select Employment Type",
        },
        {
          value: "Full-Time",
          label: "Full-Time",
        },
        {
          value: "Part-Time",
          label: "Part-Time",
        },
        {
          value: "Contract",
          label: "Contract",
        },
      ],

      required: false,
    },
    {
      name: "work_location",
      label: "Work Location",
      placeholder: "e.g., Kathmandu Office",
      type: "text",
      required: false,
    },
    {
      name: "roles",
      label: "Roles",
      collection: "Roles",
      labelField: "name",
      firstOption: "select roles",
      type: "relational_field_select",
      required: false,
    },
  ],
  payroll_and_benifits: [
    {
      name: "bank_account_number",
      label: "Bank Account Number",
      placeholder: "123456789",
      type: "text",
      required: false,
    },
    {
       name: "hr_allowance",
       label: "HR Allowance",
       type: "bool"
    },
    {
      name: "pan_account_number",
      label: "Pan Account Number",
      placeholder: "123456789",
      type: "text",
      required: false,
    },
    {
      name: "ssf",
      label: "Is SSF applied",
      type: "bool"
    },
    {
      name: "is_attendance_exception",
      label: "Is attendance ignore for salary calculation",
      type: "bool"
    }
  ],
  insurance_information: [
      {
        name: "insured_amount",
        label: "Insured Amount",
        placeholder: "Insured Amount",
        type: "number"
      },
      {
        name: "insurance_premium",
        label: "Insurance Premium",
        placeholder: "Insurance Premium",
        type: "number"
      },
      {
        name: "insurance_document",
        label: "Insurance Document",
        type: "file"
      }
  ],
  additional_information: [
    {
      name: "cv",
      label: "Upload CV",
      placeholder: "upload cv",
      type: "file",
      required: false,
    },
    {
      name: "bio",
      label: "Bio",
      placeholder: "please insert bio data",
      type: "rich_text",
      required: false,
    },
  ],
};

export const validationSchema = yup.object().shape({
  email: yup.string().email("invalid email address"),
  first_name: yup.string().required("first name should be required"),
  last_name: yup.string().required("last name is required"),
  email: yup.string().email("invalid email address"),
  date_of_birth_ad: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format yyyy-mm-dd"),
  joining_date: yup
    .string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, "Date must be in the format yyyy-mm-dd"),
  contact_number: yup
    .string()
    .matches(/^[0-9]{10}$/, "phone number must be 10 digit valid number"),
  emergency_contact: yup
    .string()
    .matches(/^[0-9]{10}$/, "phone number must be 10 digit valid number"),
});

export function trimFormObject(formObject) {
  const removeOption = [
    "Select Gender",
    "Select Marital Status",
    "Select Employment Type",
    "Select Role",
    "Select Department",
  ];
  const cpObject = formObject;
  Object.entries(formObject).forEach(([key, value]) => {
    if (removeOption.includes(value)) {
      delete cpObject[key];
    }
    if (value === "" && key != "bio") {
      delete cpObject[key];
    }

    if (value instanceof File) {
      if (value.size === 0) {
        delete cpObject[key];
      }
    }
  });
  return cpObject;
}

export async function validateForm(data, schema) {
  const isValid = await schema.isValid(data);
  if (isValid) {
    return isValid;
  } else {
    try {
      await schema.validate(data, { abortEarly: false });
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const errObj = error.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        return errObj;
      }
    }
  }
}

export function getErrorTab(currentTab, formDetails, errors) {
  const tabs = [];
  Object.entries(formDetails).forEach(([key, value]) => {
    value.forEach((e) => {
      // console.log(errors, e.name);
      if (errors[e.name] != undefined) {
        tabs.push(key);
      }
    });
  });
  if (tabs.includes(currentTab)) {
    return currentTab;
  } else {
    return tabs[0];
  }
}
