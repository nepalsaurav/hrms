/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // add field
  collection.fields.addAt(16, new Field({
    "hidden": false,
    "id": "select2857760304",
    "maxSelect": 1,
    "name": "employment_type",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Full-Time",
      "Part-Time",
      "Contract"
    ]
  }))

  // add field
  collection.fields.addAt(17, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2334851991",
    "max": 0,
    "min": 0,
    "name": "work_location",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(18, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text654093822",
    "max": 0,
    "min": 0,
    "name": "bank_account_number",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(19, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text4194120491",
    "max": 0,
    "min": 0,
    "name": "pan_account_number",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(20, new Field({
    "hidden": false,
    "id": "file3060792978",
    "maxSelect": 1,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "cv",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  // add field
  collection.fields.addAt(21, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "editor3709889147",
    "maxSize": 0,
    "name": "bio",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // remove field
  collection.fields.removeById("select2857760304")

  // remove field
  collection.fields.removeById("text2334851991")

  // remove field
  collection.fields.removeById("text654093822")

  // remove field
  collection.fields.removeById("text4194120491")

  // remove field
  collection.fields.removeById("file3060792978")

  // remove field
  collection.fields.removeById("editor3709889147")

  return app.save(collection)
})
