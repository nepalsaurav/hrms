/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3637297964")

  // update collection data
  unmarshal({
    "viewRule": "(@request.auth.employee.roles.name = \"Employee\" && @request.auth.employee.id = employee.id)"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3637297964")

  // update collection data
  unmarshal({
    "viewRule": "@request.auth.employee.roles.name = \"Admin\" ||\n\n\n(@request.auth.employee.roles.name = \"Employee\" && @request.auth.employee.id = employee.id)"
  }, collection)

  return app.save(collection)
})
