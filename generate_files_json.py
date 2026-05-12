import os
import json

ROOT = "."
OUTPUT = "files.json"
ALLOWED_EXT = {".txt", ".html"}
IGNORE_FILES = {"index.html", "files.json"}

def scan(path):
    items = []
    for name in sorted(os.listdir(path)):
        if name.startswith("."):
            continue

        if name.lower() in IGNORE_FILES:
            continue

        full_path = os.path.join(path, name)
        rel_path = os.path.relpath(full_path, ROOT)

        if os.path.isdir(full_path):
            children = scan(full_path)
            if children:
                items.append({
                    "type": "directory",
                    "name": name,
                    "children": children
                })
        else:
            ext = os.path.splitext(name)[1].lower()
            if ext in ALLOWED_EXT:
                items.append({
                    "type": "file",
                    "name": name,
                    "path": rel_path.replace("\\", "/")
                })
    return items

tree = scan(ROOT)

with open(OUTPUT, "w", encoding="utf-8") as f:
    json.dump(tree, f, indent=2)

print("files.json generated (index.html ignored)")
