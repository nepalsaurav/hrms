#!/bin/bash

# Check if a version number is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <version>"
    echo "Example: $0 0.0.1"
    exit 1
fi

# Set variables
VERSION="$1"
RELEASE_BASE="release"
OUTPUT_DIR="$RELEASE_BASE"
ZIP_FILE="$RELEASE_BASE/hrms_release_v$VERSION.zip"
FILES_TO_COPY=("hrms")  # List of files to include
FOLDERS_TO_COPY=("pb_hooks" "pb_public" "settings")  # List of folders to include

# Ensure the release base directory exists
if [ ! -d "$RELEASE_BASE" ]; then
    echo "Creating base release directory..."
    mkdir -p "$RELEASE_BASE"
fi

# Clean up previous output
if [ -d "$OUTPUT_DIR" ]; then
    echo "Cleaning up old release directory..."
    rm -rf "$OUTPUT_DIR"
fi

if [ -f "$ZIP_FILE" ]; then
    echo "Removing old zip file..."
    rm -f "$ZIP_FILE"
fi

# Create the output directory
echo "Creating release directory..."
mkdir -p "$OUTPUT_DIR"

# Copy files
echo "Copying files..."
for file in "${FILES_TO_COPY[@]}"; do
    if [ -f "$file" ]; then
        cp "$file" "$OUTPUT_DIR"
    else
        echo "Warning: File '$file' does not exist!"
    fi
done

# Copy folders
echo "Copying folders..."
for folder in "${FOLDERS_TO_COPY[@]}"; do
    if [ -d "$folder" ]; then
        cp -r "$folder" "$OUTPUT_DIR"
    else
        echo "Warning: Folder '$folder' does not exist!"
    fi
done

# Create a zip archive
echo "Creating zip archive..."
zip -r "$ZIP_FILE" "$OUTPUT_DIR"

echo "Done! Release package created as '$ZIP_FILE'."
