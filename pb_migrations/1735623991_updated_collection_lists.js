/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_361311661")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT id, name, type\nFROM _collections\nWHERE name NOT IN ('_auth', '_mfas', '_otps', '_externalAuths', '_authOrigins', '_superusers');\n"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_361311661")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT id, name, type\nFROM _collections\nWHERE name != '_auth' AND name != '_mfas';"
  }, collection)

  return app.save(collection)
})
