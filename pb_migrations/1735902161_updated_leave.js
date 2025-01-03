/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1358315067")

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "bool1856597760",
    "name": "is_half",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1358315067")

  // remove field
  collection.fields.removeById("bool1856597760")

  return app.save(collection)
})
