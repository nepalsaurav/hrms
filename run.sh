#!/bin/bash

# Get the base directory of the script
BASE_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

if [ $# -eq 0 ]; then
    echo "Usage: $0 <arg1> [arg2] [arg3] ..."
    exit 1
fi

# If dev argument is provided
if [ "$1" == "dev" ]; then
    # Function to cleanup and kill background processes
    cleanup() {
        echo "Cleaning up and killing background processes..."
        kill $pid1 $pid2
        exit
    }

    # Trap EXIT and INT signals to call the cleanup function
    trap cleanup EXIT
    trap cleanup INT

    # Run the first program in the background and capture its PID
    (cd "$BASE_DIR/front-end" && npm run dev) & pid1=$!

    # Run the second program in the background and capture its PID
    (cd "$BASE_DIR" && ./hrms serve) & pid2=$!

    # Wait for both programs to finish
    wait

elif [ "$1" == "build" ]; then
    # Run the build command for front-end
    cd "$BASE_DIR/front-end" && npm run build
    # After completion, copy files from front-end/build to back-end/pb_public
    rm -rf "$BASE_DIR/pb_public"/*
    cp -r "$BASE_DIR/front-end/build"/* "$BASE_DIR/pb_public"

    (cd "$BASE_DIR" && go build)
else
    echo "Valid command should be provided"
fi