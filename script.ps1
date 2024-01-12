# Get the base directory of the script
$scriptPath = $MyInvocation.MyCommand.Definition
$baseDir = Split-Path $scriptPath -Parent

if ($args.Count -eq 0) {
    Write-Host "Usage: $scriptPath <arg1> [arg2] [arg3] ..."
    exit 1
}

# If dev argument is provided
if ($args[0] -eq "dev") {
    # Function to cleanup and kill background processes
    function Cleanup {
        Write-Host "Cleaning up and killing background processes..."
        Stop-Process -Id $pid1 -Force
        Stop-Process -Id $pid2 -Force
        exit
    }

    # Register the cleanup function for EXIT and INT signals
    $null = Register-ObjectEvent -InputObject $null -EventName "Exiting" -Action { Cleanup }
    $null = Register-ObjectEvent -InputObject $null -EventName "SigINT" -Action { Cleanup }

    # Run the first program in the background and capture its PID
    Start-Process powershell -ArgumentList "-NoProfile -Command `"cd `"$baseDir\front-end`" ; npm run dev`"" -PassThru -Wait -NoNewWindow | ForEach-Object { $pid1 = $_.Id }

    # Run the second program in the background and capture its PID
    Start-Process powershell -ArgumentList "-NoProfile -Command `"cd `"$baseDir\back-end`" ; air serve`"" -PassThru -Wait -NoNewWindow | ForEach-Object { $pid2 = $_.Id }

    # Wait for both programs to finish
    Wait-Process -Id $pid1, $pid2

} elseif ($args[0] -eq "build") {
    # Run the build command for front-end
    Start-Process powershell -ArgumentList "-NoProfile -Command `"cd `"$baseDir\front-end`" ; npm run build`"" -Wait -NoNewWindow

    # After completion, copy files from front-end/build to back-end/pb_public
    Remove-Item "$baseDir\back-end\pb_public\*" -Force
    Copy-Item "$baseDir\front-end\dist\*" "$baseDir\back-end\pb_public" -Recurse -Force

    Start-Process powershell -ArgumentList "-NoProfile -Command `"cd `"$baseDir\back-end`" ; go build`"" -Wait -NoNewWindow

} else {
    Write-Host "Valid command should be provided"
}
