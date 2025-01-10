/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3740038821")

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "file3834550803",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "logo",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3740038821")

  // remove field
  collection.fields.removeById("file3834550803")

  return app.save(collection)
})
