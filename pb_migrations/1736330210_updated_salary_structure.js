/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_117177459")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_cJqiwEzSF0` ON `salary_structure` (`name`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_117177459")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
