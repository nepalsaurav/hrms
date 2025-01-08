/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_537160398")

  // add field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "bool4236195527",
    "name": "depends_on_payment_days",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "bool4250244486",
    "name": "is_tax_applicable",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "bool2567181538",
    "name": "round_to_the_nearest_integer",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "bool1284093838",
    "name": "do_not_include_in_total",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_537160398")

  // remove field
  collection.fields.removeById("bool4236195527")

  // remove field
  collection.fields.removeById("bool4250244486")

  // remove field
  collection.fields.removeById("bool2567181538")

  // remove field
  collection.fields.removeById("bool1284093838")

  return app.save(collection)
})
