/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "select2808657464",
    "maxSelect": 1,
    "name": "maritial_status",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Single",
      "Married",
      "Divorced",
      "Widowed"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // remove field
  collection.fields.removeById("select2808657464")

  return app.save(collection)
})
