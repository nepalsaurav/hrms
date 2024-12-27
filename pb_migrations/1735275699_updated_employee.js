/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "select2808657464",
    "maxSelect": 1,
    "name": "marital_status",
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

  // update field
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
})
