import * as XLSX from "xlsx";
import { client } from "@/api/pocketbase";
import Swal from "sweetalert2";

export async function importExcel(form, resetForm, importError, router, type) {
  const file = form.get("file");
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(sheet, {
      header: 1,
      raw: false,
    });
    const headerRow = sheetData[1];
    const uploadData = [];
    const jsonData = sheetData.slice(2).map((row, index) => {
      const obj = {};
      row.forEach((e, i) => {
        const key = headerRow[i].replace(/\*$/, "");
        obj[key] = e;
      });
      Object.keys(obj).length > 0 && uploadData.push(obj);
    });
    uploadAttendance(uploadData, form, resetForm, importError, router, type);
  };
  reader.readAsArrayBuffer(file);
}

async function uploadAttendance(
  uploadData,
  form,
  resetForm,
  importError,
  router,
  type,
) {
  const batch = client.createBatch();
  uploadData.forEach((item) => {
    batch.collection("attendance").create(item);
  });
  try {
    const result = await batch.send();
    console.log(result);
    Swal.fire({
      title: "success",
      text: "succesfully uploaded",
      icon: "success",
    });
  } catch (err) {
    importError.value = err.data.message;
  } finally {
    resetForm(form);
  }
}
