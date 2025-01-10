/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.employee.roles.name = 'Admin' ||\n(@request.auth.employee.roles.name = 'Employee')"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.employee.roles.name = 'Admin'"
  }, collection)

  return app.save(collection)
})
