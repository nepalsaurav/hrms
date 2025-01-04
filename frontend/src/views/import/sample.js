import { utils, write } from "xlsx";
import { client } from "@/api/pocketbase";
import { getCurrentDate } from "@/utils";
export async function createSample(schema, type) {
  if (schema.name === "attendance") {
    await attendanceCollection(schema, type);
  } else {
    genericImportCollection(schema, type);
  }
}

async function attendanceCollection(schema, type) {
  const data = [];
  data.push(["Note: * field are required"]);
  const headers = [];
  const newRemoveHeader = ["id", "created", "updated"];
  const updateRemoveHeader = ["created", "updated", "employee", "date"];
  schema.fields.forEach((e) => {
    if (type === "new") {
      if (!newRemoveHeader.includes(e.name)) {
        e.required ? headers.push(`${e.name}*`) : headers.push(e.name);
      }
    } else {
      if (!updateRemoveHeader.includes(e.name)) {
        e.required ? headers.push(`${e.name}*`) : headers.push(e.name);
      }
    }
  });
  data.push(headers);
  if (type === "new") {
    headers.splice(1, 0, "employee_full_name");
    headers.splice(2, 0, "employee_id");
    try {
      const records = await client.collection("employee").getFullList();
      records.forEach((e) => {
        data.push([
          e.id,
          e.full_name,
          e.employee_id,
          getCurrentDate(),
          "",
          "present",
        ]);
      });
    } catch {}
  }

  const worksheet = utils.aoa_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "attendance_sample.xlsx";
  link.click();
  URL.revokeObjectURL(link.href);
}

async function genericImportCollection(schema, type) {
  const data = [];
  data.push(["Note: * field are required"]);
  const headers = [];
  const newRemoveHeader = ["id", "created", "updated"];
  const updateRemoveHeader = ["created", "updated"];
  schema.fields.forEach((e) => {
    if (type === "new") {
      if (!newRemoveHeader.includes(e.name)) {
        e.required ? headers.push(`${e.name}*`) : headers.push(e.name);
      }
    } else {
      if (!updateRemoveHeader.includes(e.name)) {
        e.required ? headers.push(`${e.name}*`) : headers.push(e.name);
      }
    }
  });
  data.push(headers);
  const worksheet = utils.aoa_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");
  const excelBuffer = write(workbook, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "sample.xlsx";
  link.click();
  URL.revokeObjectURL(link.href);
}
