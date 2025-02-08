#!/usr/bin/env python3
"""
test_structure.py

This script verifies that the expected repository structure for 'makarasham' exists.
It checks for the presence of required directories and files.
"""

import os
import sys

# Determine the project root directory (one level up from this script)
root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

# List of required directories (relative to the project root)
required_directories = [
    "client",
    os.path.join("client", "public"),
    os.path.join("client", "src"),
    os.path.join("client", "src", "components"),
    os.path.join("client", "src", "tests"),
    "server",
    os.path.join("server", "adapters"),
    os.path.join("server", "routes"),
    os.path.join("server", "utils"),
    os.path.join("server", "tests"),
]

# List of required files (relative to the project root)
required_files = [
    "README.md",
    os.path.join("client", "src", "App.js"),
    os.path.join("client", "src", "index.js"),
    os.path.join("server", "adapters", "meteostatAdapter.js"),
    os.path.join("server", "routes", "weather.js"),
    os.path.join("server", "utils", "cacheLayer.js"),
    os.path.join("server", "server.js"),
]

def check_directories():
    success = True
    for directory in required_directories:
        dir_path = os.path.join(root_dir, directory)
        if not os.path.isdir(dir_path):
            print(f"Missing directory: {directory}")
            success = False
        else:
            print(f"Found directory: {directory}")
    return success

def check_files():
    success = True
    for file in required_files:
        file_path = os.path.join(root_dir, file)
        if not os.path.isfile(file_path):
            print(f"Missing file: {file}")
            success = False
        else:
            print(f"Found file: {file}")
    return success

if __name__ == "__main__":
    print("Verifying repository structure...\n")
    dirs_ok = check_directories()
    files_ok = check_files()
    if dirs_ok and files_ok:
        print("\nRepository structure is correct.")
        sys.exit(0)
    else:
        print("\nRepository structure is incomplete or incorrect.")
        sys.exit(1)
