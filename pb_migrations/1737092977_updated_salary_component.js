/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_537160398")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "bool3689859561",
    "name": "is_assumed",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_537160398")

  // remove field
  collection.fields.removeById("bool3689859561")

  return app.save(collection)
})
