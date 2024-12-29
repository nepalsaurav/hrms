export function trimFormObject(formObject) {
  const removeOption = [
    "Select Gender",
    "Select Marital Status",
    "Select Employment Type",
    "Select Role",
    "Select Department",
  ];
  const cpObject = new FormData();

  Object.entries(formObject).forEach(([key, value]) => {
    if (!(value instanceof File) && value != "") {
      cpObject.append(key, value);
    }

    if (value === "checkbox_on") {
      cpObject.append(key, "true");
    }
    if (value === "checkbox_off") {
      cpObject.append(key, "false");
    }
    if (value instanceof File) {
      if (value.size !== 0) {
        cpObject.append(key, value);
      }
    }
  });
  return cpObject;
}

export function genericTrimFormObject(formObject) {
  const cpObject = formObject;
  Object.entries(formObject).forEach(([key, value]) => {
    if (value instanceof File) {
      if (value.size === 0) {
        delete cpObject[key];
      }
    }
  });
  return cpObject;
}

export function convertUtcToLocalDate(utcString) {
  // Convert the string to a JavaScript Date object in UTC
  const utcDate = new Date(utcString);
  // Convert UTC date to local time
  const localDate = new Date(
    utcDate.toLocaleString("en-US", {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    }),
  );
  // Format the local date in "yyyy-mm-dd time"
  const year = localDate.getFullYear();
  const month = String(localDate.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(localDate.getDate()).padStart(2, "0");
  const hours = String(localDate.getHours()).padStart(2, "0");
  const minutes = String(localDate.getMinutes()).padStart(2, "0");
  const seconds = String(localDate.getSeconds()).padStart(2, "0");
  // Combine the formatted components
  const localString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return localString;
}

export function convertCamelToProper(input) {
  return input
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camel case
    .toLowerCase() // Convert all to lowercase
    .replace(/^\w/, (c) => c.toUpperCase()); // Capitalize the first letter
}

export function convertCamelToLowerCase(input) {
  return input
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Add space between camel case
    .toLowerCase(); // Convert all to lowercase
}
