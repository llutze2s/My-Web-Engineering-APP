import os
import glob

#Alle Dateien Sammeln
all_files= glob.glob("./**",recursive=True)

#Javascript, JSON, HTML und CSS Herausfiltern
filter_files = [f for f in all_files if 
    (f.endswith(".js") or
    f.endswith(".mjs") or
    f.endswith(".json") or
    f.endswith(".html") or
    f.endswith(".css")
)]

#Ordner und sonstige nicht selbsterstellte Dateien ausschließen
filter_files = [f for f in filter_files if 
    (".git" not in f and 
    ".gitignore" not in f and 
    ".md" not in f and
    ".vscode" not in f and
    ".storybook" not in f and
    "build-storybook.log" not in f and
    "stories" not in f and
    "Übungen" not in f and
    "package-lock.json" not in f and
    "package.json" not in f and
    "node_modules" not in f
)]

count=0
#Zeilen Zählen
for file in filter_files:
    try:
        current = sum(1 for line in open(file))
        count += current
    except:
        None

print(str(count)+" Zeilen in "+ str(len(filter_files))+" Dateien." )