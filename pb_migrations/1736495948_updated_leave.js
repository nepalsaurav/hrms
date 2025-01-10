/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1358315067")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.employee.roles.name = \"Admin\" ||\n\n(@request.auth.employee.roles.name = \"Department Head\" && @request.auth.employee.department ?= employee.department && @request.auth.employee.id != employee.id) ||\n\n(@request.auth.employee.roles.name = \"Branch\" && @request.auth.employee.branch = employee.branch && @request.auth.employee.id != employee.id) || \n\n(@request.auth.employee.roles.name = \"Employee\" && @request.auth.employee.id = employee.id)"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1358315067")

  // update collection data
  unmarshal({
    "deleteRule": "@request.auth.employee.roles.name = \"Admin\" \n"
  }, collection)

  return app.save(collection)
})
