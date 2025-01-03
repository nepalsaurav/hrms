/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_117177459")

  // remove field
  collection.fields.removeById("relation1047254091")

  // remove field
  collection.fields.removeById("number2392944706")

  // remove field
  collection.fields.removeById("text709020953")

  // add field
  collection.fields.addAt(2, new Field({
    "hidden": false,
    "id": "json3997758973",
    "maxSize": 0,
    "name": "components",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_117177459")

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_537160398",
    "hidden": false,
    "id": "relation1047254091",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "salary_component",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "hidden": false,
    "id": "number2392944706",
    "max": null,
    "min": null,
    "name": "amount",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text709020953",
    "max": 0,
    "min": 0,
    "name": "calculated",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("json3997758973")

  return app.save(collection)
})
