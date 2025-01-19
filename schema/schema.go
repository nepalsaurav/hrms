package schema

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

// saveCollectionsToFile writes the collections schema to a JSON file.
func saveCollectionsToFile(app *pocketbase.PocketBase) error {
	allCollections, err := app.FindAllCollections(core.CollectionTypeBase, core.CollectionTypeAuth, core.CollectionTypeView)
	if err != nil {
		return err
	}

	jsonData, err := json.MarshalIndent(allCollections, "", "  ")
	if err != nil {
		return err
	}

	file, err := os.Create("schema/pb_schema.json")
	if err != nil {
		return err
	}
	defer file.Close()

	_, err = file.Write(jsonData)
	if err != nil {
		return err
	}
	return nil
}

func ListenCollectionEvent(app *pocketbase.PocketBase) {
	// Handle schema export on server start
	app.OnServe().BindFunc(func(e *core.ServeEvent) error {
		if err := saveCollectionsToFile(app); err != nil {
			fmt.Println("Error saving schema:", err)
		}
		return e.Next()
	})

	// Common handler for collection events
	handleCollectionEvent := func(e *core.CollectionEvent) error {
		if err := saveCollectionsToFile(app); err != nil {
			fmt.Println("Error saving schema:", err)
		}
		return e.Next()
	}

	// Bind collection events
	app.OnCollectionAfterCreateSuccess().BindFunc(handleCollectionEvent)
	app.OnCollectionAfterUpdateSuccess().BindFunc(handleCollectionEvent)
	app.OnCollectionAfterDeleteSuccess().BindFunc(handleCollectionEvent)
}
