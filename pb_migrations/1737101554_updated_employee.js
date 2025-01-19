/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // add field
  collection.fields.addAt(31, new Field({
    "hidden": false,
    "id": "file2117663796",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "insurance_document",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // remove field
  collection.fields.removeById("file2117663796")

  return app.save(collection)
})
