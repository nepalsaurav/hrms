/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1358315067")

  // add field
  collection.fields.addAt(7, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_470577921",
    "hidden": false,
    "id": "relation3803988881",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "leave_type",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1358315067")

  // remove field
  collection.fields.removeById("relation3803988881")

  return app.save(collection)
})
