#!/usr/bin/env python3
"""
create_project_structure.py

This script creates the empty folder and file structure for the "makarasham" app.
It should be placed in the "setup" folder (i.e. /Users/shaik/projects/makarasham/setup).
When run, it creates the following structure in the app root (/Users/shaik/projects/makarasham):

makarasham/
├── client/
│   ├── public/               
│   │   └── .gitkeep
│   └── src/                  
│       ├── components/       
│       │   └── .gitkeep
│       ├── tests/            
│       │   └── .gitkeep
│       ├── App.js            
│       ├── index.js          
│       └── .gitkeep          # (optional placeholder)
├── server/
│   ├── adapters/             
│   │   ├── meteostatAdapter.js
│   │   └── .gitkeep          
│   ├── routes/               
│   │   ├── weather.js        
│   │   └── .gitkeep          
│   ├── utils/                
│   │   ├── cacheLayer.js     
│   │   └── .gitkeep          
│   ├── tests/                
│   │   └── .gitkeep
│   ├── server.js             
│   └── .gitkeep              
├── .gitignore                
└── README.md                 
"""

import os

# Determine the root directory (one level up from the current script's directory)
script_dir = os.path.dirname(os.path.abspath(__file__))
root_dir = os.path.abspath(os.path.join(script_dir, ".."))

# Define directory structure relative to root_dir
directories = [
    os.path.join("client", "public"),
    os.path.join("client", "src", "components"),
    os.path.join("client", "src", "tests"),
    os.path.join("server", "adapters"),
    os.path.join("server", "routes"),
    os.path.join("server", "utils"),
    os.path.join("server", "tests"),
]

# Define files to create with optional default content (relative to root_dir)
files = {
    os.path.join("client", "src", "App.js"): "// Main App component\n",
    os.path.join("client", "src", "index.js"): "// Entry point for React\n",
    os.path.join("server", "adapters", "meteostatAdapter.js"): "// Meteostat adapter implementation\n",
    os.path.join("server", "routes", "weather.js"): "// Weather API endpoint implementation\n",
    os.path.join("server", "utils", "cacheLayer.js"): "// Caching abstraction (stub for now)\n",
    os.path.join("server", "server.js"): "// Main Express server file\n",
    ".gitignore": "# Node modules\nnode_modules/\n\n# Build files\nbuild/\n\n# Logs\nlogs/\n",
    "README.md": "# makarasham\n\nProject setup for the makarasham historical weather app.\n",
}

def create_dir(path):
    """Create directory if it does not exist, and add a .gitkeep file if empty."""
    if not os.path.exists(path):
        os.makedirs(path)
        print(f"Created directory: {path}")
    else:
        print(f"Directory already exists: {path}")
    # Create a .gitkeep file inside the directory (if none exists)
    gitkeep = os.path.join(path, ".gitkeep")
    if not os.path.exists(gitkeep):
        with open(gitkeep, "w") as f:
            f.write("")
        print(f"Created .gitkeep in: {path}")

def create_file(path, content=""):
    """Create a file with the given content if it does not exist."""
    if not os.path.exists(path):
        with open(path, "w") as f:
            f.write(content)
        print(f"Created file: {path}")
    else:
        print(f"File already exists: {path}")

def main():
    # Create directories
    for dir_rel in directories:
        dir_path = os.path.join(root_dir, dir_rel)
        create_dir(dir_path)

    # Create files
    for file_rel, content in files.items():
        file_path = os.path.join(root_dir, file_rel)
        # Ensure the directory for the file exists
        file_dir = os.path.dirname(file_path)
        if not os.path.exists(file_dir):
            os.makedirs(file_dir)
            print(f"Created parent directory for file: {file_dir}")
        create_file(file_path, content)

    # Optionally, print out the directory tree structure
    print("\nProject structure (from root_dir):")
    for root, dirs, file_names in os.walk(root_dir):
        level = root.replace(root_dir, "").count(os.sep)
        indent = " " * 4 * level
        print(f"{indent}{os.path.basename(root)}/")
        subindent = " " * 4 * (level + 1)
        for f in file_names:
            print(f"{subindent}{f}")

if __name__ == "__main__":
    main()
