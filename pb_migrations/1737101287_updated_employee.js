/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // add field
  collection.fields.addAt(29, new Field({
    "hidden": false,
    "id": "number2173896005",
    "max": null,
    "min": null,
    "name": "insured_amount",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(30, new Field({
    "hidden": false,
    "id": "number1679569184",
    "max": null,
    "min": null,
    "name": "insurance_premium",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // remove field
  collection.fields.removeById("number2173896005")

  // remove field
  collection.fields.removeById("number1679569184")

  return app.save(collection)
})
