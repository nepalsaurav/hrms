/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // update collection data
  unmarshal({
    "createRule": "@request.auth.employee.roles.name = \"Admin\"",
    "deleteRule": "@request.auth.employee.roles.name = \"Admin\"",
    "updateRule": "@request.auth.employee.roles.name = \"Admin\"",
    "viewRule": "@request.auth.employee.roles.name = \"Admin\" || \n(@request.auth.employee.roles.name = \"Employee\" && @request.auth.employee.id = id)"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // update collection data
  unmarshal({
    "createRule": "",
    "deleteRule": "",
    "updateRule": "",
    "viewRule": ""
  }, collection)

  return app.save(collection)
})
