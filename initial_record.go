package main

import (
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

func CreateInitialRecord(app *pocketbase.PocketBase) {
	app.OnServe().BindFunc(func(e *core.ServeEvent) error {
		_ = RolesRecord(app)
		return e.Next()
	})
}

func RolesRecord(app *pocketbase.PocketBase) error {
	collection, err := app.FindCollectionByNameOrId("roles")
	if err != nil {
		return err
	}
	roles := []string{"Admin", "Employee", "Branch Head", "Department Head"}
	for _, role := range roles {
		record := core.NewRecord(collection)
		record.Set("name", role)
		err = app.Save(record)
		if err != nil {
			return err
		}
	}
	return nil
}
