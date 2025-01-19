/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2358601297")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.employee.roles = \"Admin\" "
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2358601297")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.employee.roles = \"Admin\" ||\n@request.auth.employee.branch = id"
  }, collection)

  return app.save(collection)
})
