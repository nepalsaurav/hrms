import * as yup from "yup";

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
      if (value === "checkbox_on") {
        cpObject.append(key, true);
      } else if (value === "checkbox_off") {
        cpObject.append(key, false);
      } else {
        console.log(key, value);
        cpObject.append(key, value);
      }
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

export function snakeToProperCase(snakeCaseString) {
  return snakeCaseString
    .split("_") // Split the string by underscores
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize each word
    .join(" "); // Join the words with spaces
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

export function getCurrentTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

export function getCurrentDate() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function isEmployeePresent(
  check_in_time,
  check_out_time,
  employee_check_in,
  employee_check_out,
) {
  // Parse the check-in and check-out times
  console.log(
    check_in_time,
    check_out_time,
    employee_check_in,
    employee_check_out,
  );
  const checkInTime = new Date(`1970-01-01T${check_in_time}Z`);
  const checkOutTime = new Date(`1970-01-01T${check_out_time}Z`);
  const employeeCheckIn = new Date(`1970-01-01T${employee_check_in}Z`);
  const employeeCheckOut = new Date(`1970-01-01T${employee_check_out}Z`);
  // Check if the employee's check-in time is within the working hours
  //
  console.log(checkInTime, checkOutTime, employeeCheckIn, employeeCheckOut);
  if (employeeCheckIn <= checkInTime && employeeCheckIn >= checkOutTime) {
    return "Present";
  } else {
    return "Absent";
  }
}

export function isWeekDay(dateStr, daysArray) {
  // Convert the string to a Date object
  let date = new Date(dateStr);

  // Get the day of the week in string format (e.g., "Mon", "Tue", ..., "Sat")
  let dayOfWeek = date
    .toLocaleString("en-us", { weekday: "short" })
    .toUpperCase();

  // Check if the day is in the provided array
  return daysArray.includes(dayOfWeek);
}
