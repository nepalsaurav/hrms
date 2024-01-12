package main

import (
	"log"
	"net/http"
	"os"

	"github.com/labstack/echo/v5"
	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
)

func main() {
	app := pocketbase.New()

	app.OnBeforeServe().Add(func(e *core.ServeEvent) error {
		e.Router.GET("/*", apis.StaticDirectoryHandler(os.DirFS("./pb_public"), false))

		e.Router.GET("api/hello/:name", func(c echo.Context) error {
			name := c.PathParam("name")

			return c.JSON(http.StatusOK, map[string]string{"message": "Hello " + name})
		} /* optional middlewares */)

		e.Router.GET("api/get-collection-schema", func(c echo.Context) error {
			message := map[string]string{
				"message": "failed",
			}
			name := c.QueryParam("name")
			if name == "" {
				message["message"] = "collection name is required"
				return c.JSON(http.StatusBadRequest, message)
			}
			collection, err := app.Dao().FindCollectionByNameOrId(name)
			if err != nil {
				message["message"] = "something error occured"
				return c.JSON(http.StatusBadRequest, message)
			}
			return c.JSON(http.StatusOK, collection)
		}, apis.RequireAdminOrRecordAuth())
		return nil
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
