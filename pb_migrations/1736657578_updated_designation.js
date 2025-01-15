/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2041987705")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.employee.roles.name = \"Admin\" ",
    "deleteRule": "@request.auth.employee.roles.name = \"Admin\" ",
    "listRule": "@request.auth.employee.roles.name = \"Admin\" ||\n@request.auth.employee.designation:each ?= id",
    "updateRule": "@request.auth.employee.roles.name = \"Admin\" ",
    "viewRule": "@request.auth.employee.roles.name = \"Admin\" ||\n@request.auth.employee.designation ?= id "
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2041987705")

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
