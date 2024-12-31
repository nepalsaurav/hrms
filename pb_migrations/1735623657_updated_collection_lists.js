/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_361311661")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT id, name, type\nFROM _collections"
  }, collection)

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "json2363381545",
    "maxSize": 1,
    "name": "type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_361311661")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT id, name\nFROM _collections"
  }, collection)

  // remove field
  collection.fields.removeById("json2363381545")

  return app.save(collection)
})
