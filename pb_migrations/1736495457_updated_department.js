/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_867029274")

  // update collection data
  unmarshal({
    "listRule": "\n@request.auth.employee.department:each ?= id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_867029274")

  // update collection data
  unmarshal({
    "listRule": "\n@request.auth.employee.department ?= id"
  }, collection)

  return app.save(collection)
})
