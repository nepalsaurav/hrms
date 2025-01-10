/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3490198752")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.employee.roles.name = \"Admin\" ||\n\n(@request.auth.employee.roles.name = \"Department Head\" && @request.auth.employee.department ?= employee.department && (@request.auth.employee != employee || @request.body.status = \"pending\")) ||\n\n(@request.auth.employee.roles.name = \"Branch\" && @request.auth.employee.branch = employee.branch && (@request.auth.employee != employee || @request.body.status = \"pending\")) ||\n\n(@request.auth.employee.roles.name = \"Employee\" && @request.auth.employee.id = employee.id && @request.body.status = \"pending\")",
    "updateRule": "@request.auth.employee.roles.name = \"Admin\" ||\n\n(@request.auth.employee.roles.name = \"Department Head\" && @request.auth.employee.department ?= employee.department && (@request.auth.employee != employee || status = \"pending\")) ||\n\n(@request.auth.employee.roles.name = \"Branch\" && @request.auth.employee.branch = employee.branch && (@request.auth.employee != employee || status = \"pending\")) ||\n\n(@request.auth.employee.roles.name = \"Employee\" && @request.auth.employee = employee && @request.body.status = \"pending\")"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3490198752")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.employee.roles.name = \"Admin\" ||\n\n(@request.auth.employee.roles.name = \"Department Head\" && @request.auth.employee.department ?= employee.department && (@request.auth.employee != employee || status = \"pending\")) ||\n\n(@request.auth.employee.roles.name = \"Branch\" && @request.auth.employee.branch = employee.branch && (@request.auth.employee != employee || status = \"pending\")) ||\n\n(@request.auth.employee.roles.name = \"Employee\" && @request.auth.employee.id = employee.id && status = \"pending\")",
    "updateRule": "@request.auth.employee.roles.name = \"Admin\" ||\n\n(@request.auth.employee.roles.name = \"Department Head\" && @request.auth.employee.department ?= employee.department && (@request.auth.employee != employee || status = \"pending\")) ||\n\n(@request.auth.employee.roles.name = \"Branch\" && @request.auth.employee.branch = employee.branch && (@request.auth.employee != employee || status = \"pending\")) ||\n\n(@request.auth.employee.roles.name = \"Employee\" && @request.auth.employee.id = employee.id && status = \"pending\")"
  }, collection)

  return app.save(collection)
})
