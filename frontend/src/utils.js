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
    if (value === "") {
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
