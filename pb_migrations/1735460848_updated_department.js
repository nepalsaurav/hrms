/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_867029274")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_QvYAup4Xo5` ON `department` (`name`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_867029274")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE INDEX `idx_QvYAup4Xo5` ON `department` (`name`)"
    ]
  }, collection)

  return app.save(collection)
})
