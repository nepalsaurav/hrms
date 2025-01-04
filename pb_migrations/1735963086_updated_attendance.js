/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2471705857")

  // remove field
  collection.fields.removeById("text2420534521")

  // remove field
  collection.fields.removeById("text3961577812")

  // remove field
  collection.fields.removeById("select2220743308")

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2471705857")

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2420534521",
    "max": 0,
    "min": 0,
    "name": "check_in",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3961577812",
    "max": 0,
    "min": 0,
    "name": "check_out",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "select2220743308",
    "maxSelect": 1,
    "name": "approve",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "pending",
      "accepted",
      "rejected"
    ]
  }))

  return app.save(collection)
})
