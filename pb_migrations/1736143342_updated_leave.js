/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1358315067")

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "number3957652582",
    "max": null,
    "min": null,
    "name": "days",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1358315067")

  // remove field
  collection.fields.removeById("number3957652582")

  return app.save(collection)
})
