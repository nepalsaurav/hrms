import * as XLSX from "xlsx";
import { client } from "@/api/pocketbase";
import Swal from "sweetalert2";

export async function importExcel(form, resetForm, importError, router, type, params) {
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
    console.log(headerRow)
    const uploadData = [];
    sheetData.slice(2).forEach((row, _) => {
      if (row.length > 0) {
        const obj = {};
        row.forEach((e, i) => {
          if (params.collection === "attendance") {
            if (i < 6) {
              const key = headerRow[i].replace(/\*$/, "");
              obj[key] = e;
            }
          } else {
            const key = headerRow[i].replace(/\*$/, "");
            obj[key] = e;
          }
        });
        Object.keys(obj).length > 0 && uploadData.push(obj);
      }
    });

    uploadDataHelper(uploadData, form, resetForm, importError, router, type, params);
  };
  reader.readAsArrayBuffer(file);
}

async function uploadDataHelper(
  uploadData,
  form,
  resetForm,
  importError,
  _router,
  _type,
  params
) {
  uploadData.forEach((item) => {

    try {
      client.collection(params.collection).create(item, { requestKey: null })
    } catch (error) {
      console.log(error)
    }
  });
  Swal.fire({
    title: "success",
    text: "succesfully uploaded",
    icon: "success",
  });
  resetForm(form)
}
