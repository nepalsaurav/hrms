/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_867029274")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.employee.roles.name = \"Admin\" ",
    "deleteRule": "@request.auth.employee.roles.name = \"Admin\" ",
    "listRule": "@request.auth.employee.roles.name = \"Admin\" ||\n@request.auth.employee.department ?= id ",
    "updateRule": "@request.auth.employee.roles.name = \"Admin\" ",
    "viewRule": "@request.auth.employee.roles.name = \"Admin\" ||\n@request.auth.employee.department ?= id "
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_867029274")

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
