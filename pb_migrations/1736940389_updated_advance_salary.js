/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2975996890")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.employee.roles.name = \"Admin\" ||\n@request.auth.employee = employee",
    "viewRule": "@request.auth.employee.roles.name = \"Admin\" ||\n@request.auth.employee = employee"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2975996890")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.employee.roles.name = \"Admin\"",
    "viewRule": "@request.auth.employee.roles.name = \"Admin\""
  }, collection)

  return app.save(collection)
})
