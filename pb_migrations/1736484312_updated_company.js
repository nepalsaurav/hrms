/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3740038821")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "bool3814588639",
    "name": "default",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3740038821")

  // remove field
  collection.fields.removeById("bool3814588639")

  return app.save(collection)
})
