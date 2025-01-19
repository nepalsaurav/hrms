/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // add field
  collection.fields.addAt(35, new Field({
    "hidden": false,
    "id": "json759117322",
    "maxSize": 0,
    "name": "allowance_component",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // update field
  collection.fields.addAt(34, new Field({
    "hidden": false,
    "id": "bool2643478856",
    "name": "is_extra_allowance",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // remove field
  collection.fields.removeById("json759117322")

  // update field
  collection.fields.addAt(34, new Field({
    "hidden": false,
    "id": "bool2643478856",
    "name": "dearness_allowance",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
})
