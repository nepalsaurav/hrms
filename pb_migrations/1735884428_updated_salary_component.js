/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_537160398")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_ogQSMje9ry` ON `salary_component` (\n  `name`,\n  `abbreviation`\n)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_537160398")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
