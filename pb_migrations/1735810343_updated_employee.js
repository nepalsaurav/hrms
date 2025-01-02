/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // add field
  collection.fields.addAt(23, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_470577921",
    "hidden": false,
    "id": "relation2612035792",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "leave",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // remove field
  collection.fields.removeById("relation2612035792")

  return app.save(collection)
})
