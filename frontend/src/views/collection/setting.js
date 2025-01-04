const relationFields = {
  employee: [
    "employee.first_name",
    "employee.last_name",
    "employee.middle_name",
  ],
};

export function makeTextSearchFields(collection) {
  const fields = [];
  const ignoreFields = ["id", "created", "updated", "password", "tokenKey"];
  collection.fields.forEach((e) => {
    if (!ignoreFields.includes(e.name)) {
      if (e.type === "relation") {
        if (relationFields[e.name] !== undefined) {
          fields.push(...relationFields[e.name]);
        }
      } else {
        fields.push(e.name);
      }
    }
  });
  return fields;
}
