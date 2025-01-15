/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1358315067")

  // update collection data
  unmarshal({
    "createRule": "@request.body.leave_to >= @request.body.leave_from &&\n\n@request.auth.employee.roles.name = \"Admin\" ||\n\n(@request.auth.employee.roles.name = \"Department Head\" && @request.auth.employee.department ?= employee.department) ||\n\n(@request.auth.employee.roles.name = \"Branch\" && @request.auth.employee.branch = employee.branch) ||\n\n(@request.auth.employee.roles.name = \"Employee\" && @request.auth.employee.id = employee.id && @request.body.status = \"pending\")"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1358315067")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.employee.roles.name = \"Admin\" ||\n\n(@request.auth.employee.roles.name = \"Department Head\" && @request.auth.employee.department ?= employee.department) ||\n\n(@request.auth.employee.roles.name = \"Branch\" && @request.auth.employee.branch = employee.branch) ||\n\n(@request.auth.employee.roles.name = \"Employee\" && @request.auth.employee.id = employee.id && @request.body.status = \"pending\")"
  }, collection)

  return app.save(collection)
})
