/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // update collection data
  unmarshal({
    "listRule": ""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.employee.roles.name = \"Admin\" || \n(@request.auth.employee.roles.name = \"Employee\" && @request.auth.employee.id = id)"
  }, collection)

  return app.save(collection)
})
