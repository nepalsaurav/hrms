/// <reference path="../pb_data/types.d.ts" />

routerAdd("GET", "/api/get_collection/{collection_name}", (e) => {
  try {
    let name = e.request.pathValue("collection_name");
    let collection = $app.findCollectionByNameOrId(name);
    return e.json(200, {
      collection: {
        name: collection.name,
        listRule: collection.listRule,
        fields: collection.fields,
      },
    });
  } catch (error) {
    return e.json(400, {
      data: {
        message: String(error),
      },
    });
  }
});
