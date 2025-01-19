package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		settings := app.Settings()

		settings.Meta.AppName = "HRMS"
		settings.Batch.Enabled = true
		settings.Batch.MaxRequests = 5000
		return app.Save(settings)
	}, nil)
}
