import fs from 'fs';
import {parsePyLevel} from './parser.mjs';

let levelDir = process.argv[2] || '../public/levels';
let resultFile = process.argv[3] || 'levels-data.mjs';

function readLines(file) {
    return fs.readFileSync(file, 'utf8').
            split('\n').
            map(line => line.trimEnd());
}

function loadLevels(dirPath, dirName) {
    let levelFiles = fs.readdirSync(dirPath).
                        filter(file => file.endsWith('.py')).
                        map(file => readLines(`${dirPath}/${file}`));
    let levels = levelFiles.map(fileLines => ({dirName: dirName, ...parsePyLevel(fileLines)}));
    return levels;
}
  

let entries = fs.readdirSync(levelDir, { withFileTypes: true });
let dirs = entries.filter(file => file.isDirectory()).map(file => file.name);

let levels = [];
for (let dir of dirs) {
    let dirLevels = loadLevels(`${levelDir}/${dir}`, dir);
    levels = levels.concat(dirLevels);
}

let json = JSON.stringify(levels, null, 2);
fs.writeFileSync(resultFile, "export let levels = \n" + json);
