/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2471705857")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.employee.roles.name = \"Admin\"",
    "deleteRule": "@request.auth.employee.roles.name = \"Admin\"",
    "updateRule": "@request.auth.employee.roles.name = \"Admin\" "
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2471705857")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.employee.roles.name = \"Admin\" ||\n\n(@request.auth.employee.roles.name = \"Department Head\" && @request.auth.employee.department ?= employee.department) ||\n\n(@request.auth.employee.roles.name = \"Branch\" && @request.auth.employee.branch = employee.branch) ||\n\n(@request.auth.employee.roles.name = \"Employee\" && @request.auth.employee.id = employee.id && status = \"pending\")",
    "deleteRule": "@request.auth.employee.roles.name = \"Admin\" ||\n\n(@request.auth.employee.roles.name = \"Department Head\" && @request.auth.employee.department ?= employee.department && @request.auth.employee.id != employee.id) ||\n\n(@request.auth.employee.roles.name = \"Branch\" && @request.auth.employee.branch = employee.branch && @request.auth.employee.id != employee.id) || \n\n(@request.auth.employee.roles.name = \"Employee\" && @request.auth.employee.id = employee.id && status = \"pending\")",
    "updateRule": "@request.auth.employee.roles.name = \"Admin\" ||\n\n(@request.auth.employee.roles.name = \"Department Head\" && @request.auth.employee.department ?= employee.department && @request.auth.employee.id != employee.id) ||\n\n(@request.auth.employee.roles.name = \"Branch\" && @request.auth.employee.branch = employee.branch && @request.auth.employee.id != employee.id) ||\n\n(@request.auth.employee.roles.name = \"Employee\" && @request.auth.employee.id = employee.id && status = \"pending\")"
  }, collection)

  return app.save(collection)
})
