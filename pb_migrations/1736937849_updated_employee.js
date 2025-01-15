/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.employee.roles.name = \"Admin\" ||\n(\n  @request.auth.employee = id &&\n  @request.body.department = department &&\n  @request.body.roles = roles &&\n  @request.body.designation = designation &&\n  @request.body.salary_structure = salary_structure &&\n  @request.body.leave_type = leave_type &&\n  @request.body.bank_account_number = bank_account_number\n)"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_500247992")

  // update collection data
  unmarshal({
    "updateRule": "@request.auth.employee.roles.name = \"Admin\" ||\n(\n  @request.auth.employee = id &&\n  @request.body.department = department &&\n  @request.body.roles = roles &&\n  @request.body.designation = designation &&\n  @request.body.salary_structure = salary_structure &&\n  @request.body.leave_type = leave_type\n)"
  }, collection)

  return app.save(collection)
})
