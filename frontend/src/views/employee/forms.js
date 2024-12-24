export const formDetails = {
    "personal_details": [
        {
            name: "first_name",
            label: "First Name",
            placeholder: "e.g., John",
            type: "text",
            required: true
        },
        {
            name: "middle_name",
            label: "Middle Name",
            placeholder: "e.g., Doe",
            type: "text",
            required: false
        },
        {
            name: "last_name",
            label: "Last Name",
            placeholder: "e.g., Smith",
            type: "text",
            required: true
        },
        {
            name: "date_of_birth",
            label: "Date of Birth",
            placeholder: "e.g., 1990-01-01",
            type: "date",
            required: true
        },
        {
            name: "gender",
            label: "Gender",
            type: "select",
            options: ["Select Gender", "Male", "Female", "Other"],
            required: true
        },
        {
            name: "marital_status",
            label: "Marital Status",
            type: "select",
            options: ["Single", "Married", "Divorced", "Widowed"],
            required: false
        },
        {
            name: "nationality",
            label: "Nationality",
            placeholder: "e.g., Nepali",
            type: "text",
            required: true
        }
    ],
    "contact_details": [
        {
            name: "contact_number",
            label: "Contact Number",
            placeholder: "e.g., +977-1234567890",
            type: "tel",
            required: true
        },
        {
            name: "email",
            label: "Email Address",
            placeholder: "e.g., john.doe@example.com",
            type: "email",
            required: true
        },
        {
            name: "address",
            label: "Address",
            placeholder: "e.g., Kathmandu, Nepal",
            type: "text",
            required: true
        },
        {
            name: "emergency_contact",
            label: "Emergency Contact",
            placeholder: "e.g., +977-9876543210",
            type: "tel",
            required: false
        }
    ],
    "job_details": [
        {
            name: "employee_id",
            label: "Employee ID",
            placeholder: "e.g., EMP12345",
            type: "text",
            required: true
        },
        {
            name: "designation",
            label: "Designation",
            placeholder: "e.g., Software Engineer",
            type: "text",
            required: true
        },
        {
            name: "department",
            label: "Department",
            placeholder: "e.g., IT",
            type: "text",
            required: true
        },
        {
            name: "joining_date",
            label: "Joining Date",
            placeholder: "e.g., 2024-01-01",
            type: "date",
            required: true
        },
        {
            name: "employment_type",
            label: "Employment Type",
            type: "select",
            options: ["Full-Time", "Part-Time", "Contract"],
            required: true
        },
        {
            name: "work_location",
            label: "Work Location",
            placeholder: "e.g., Kathmandu Office",
            type: "text",
            required: false
        }
    ],
    "system_details": [
        {
            name: "role",
            label: "System Role",
            type: "select",
            options: ["Admin", "HR", "Employee"],
            required: true
        }
    ]
};
