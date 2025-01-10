/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_470577921")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.employee.roles.name = \"Admin\" ||\n@request.auth.employee.leave_type:each ?= id",
    "viewRule": "@request.auth.employee.roles.name = \"Admin\" ||\n@request.auth.employee.leave_type:each ?= id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_470577921")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.employee.roles.name = \"Admin\"",
    "viewRule": "@request.auth.employee.roles.name = \"Admin\""
  }, collection)

  return app.save(collection)
})
