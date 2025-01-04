package router

import (
	"encoding/json"
	"fmt"
	"os"

	"github.com/pocketbase/pocketbase/core"
)

func Router(se *core.ServeEvent) {
	se.Router.GET("/api/get_settings/{filename}", func(e *core.RequestEvent) error {
		filename := e.Request.PathValue("filename")
		fileContent, err := os.ReadFile(fmt.Sprintf("settings/%s", filename))
		if err != nil {
			return e.JSON(500, map[string]interface{}{
				"error": fmt.Sprintf("Failed to read file: %v", err),
			})
		}
		var data map[string]interface{}
		err = json.Unmarshal([]byte(fileContent), &data)
		if err != nil {
			return e.JSON(500, map[string]interface{}{
				"error": fmt.Sprintf("Failed to parse JSON: %v", err),
			})
		}
		return e.JSON(200, data)
	})
}
