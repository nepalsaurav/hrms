# Set the base directory
$baseDir = Get-Location

# Install Go modules
Write-Host "Installing Go modules..."

Start-Process powershell -ArgumentList "-NoProfile -Command `"cd `"$baseDir\pocketbase`" ; go mod download`"" -Wait -NoNewWindow


Start-Process powershell -ArgumentList "-NoProfile -Command `"cd `"$baseDir\back-end`" ; go mod download`"" -Wait -NoNewWindow

# Install Node.js modules
Write-Host "Installing Node.js modules..."
Start-Process powershell -ArgumentList "-NoProfile -Command `"cd `"$baseDir\front-end`" ; npm install`"" -Wait -NoNewWindow

Write-Host "Setup completed."
