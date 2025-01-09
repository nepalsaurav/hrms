/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3637297964")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_30BMQrG9ap` ON `payroll` (\n  `from_date`,\n  `to_date`,\n  `employee`\n)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3637297964")

  // update collection data
  unmarshal({
    "indexes": []
  }, collection)

  return app.save(collection)
})
