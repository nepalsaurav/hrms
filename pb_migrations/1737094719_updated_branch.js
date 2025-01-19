/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2358601297")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.employee.roles = \"Admin\" ",
    "deleteRule": "@request.auth.employee.roles = \"Admin\"",
    "listRule": "@request.auth.employee.roles = \"Admin\" ||\n@request.auth.employee.branch = id",
    "updateRule": "@request.auth.employee.roles = \"Admin\"",
    "viewRule": "@request.auth.employee.roles = \"Admin\" ||\n@request.auth.employee.branch = id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2358601297")

  // update collection data
  unmarshal({
    "createRule": null,
    "deleteRule": null,
    "listRule": null,
    "updateRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
