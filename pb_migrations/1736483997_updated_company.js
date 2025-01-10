/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3740038821")

  // remove field
  collection.fields.removeById("text223244161")

  // add field
  collection.fields.addAt(5, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "editor223244161",
    "maxSize": 0,
    "name": "address",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3740038821")

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text223244161",
    "max": 0,
    "min": 0,
    "name": "address",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("editor223244161")

  return app.save(collection)
})
