// convert-alias-to-relative.mjs
import fs from 'fs';
import path from 'path';

const projectRoot = process.cwd();
const srcRoot = path.resolve(projectRoot, 'src');

function toPosix(p) {
    return p.replace(/\\/g, '/');
}

function computeRelative(filePath, aliasPath) {
    if (!aliasPath.startsWith('@/')) return aliasPath;
    const relFromSrc = aliasPath.slice(2);
    const targetAbs = path.resolve(srcRoot, relFromSrc);
    const fromDir = path.dirname(path.resolve(projectRoot, filePath));
    let rel = path.relative(fromDir, targetAbs);
    rel = toPosix(rel);
    if (!rel.startsWith('.')) rel = './' + rel;
    return rel;
}

function transformContent(content, filePath) {
    let changed = false;
    const replacements = [];

    const importFromRe = /(import\s+[^'"]*\s+from\s+)(['"])(@\/[^'"]+)\2/g;
    const bareImportRe = /(import\s*)(['"])(@\/[^'"]+)\2/g;
    const exportFromRe = /(export\s+[^'"]*\s+from\s+)(['"])(@\/[^'"]+)\2/g;
    const dynamicImportRe = /(import\(\s*)(['"])(@\/[^'"]+)\2(\s*\))/g;

    function repImportFrom(_m, prefix, quote, aliasP) {
        const newPath = computeRelative(filePath, aliasP);
        if (newPath !== aliasP) {
            changed = true;
            replacements.push({ from: aliasP, to: newPath });
        }
        return `${prefix}${quote}${newPath}${quote}`;
    }

    function repBareImport(_m, prefix, quote, aliasP) {
        const newPath = computeRelative(filePath, aliasP);
        if (newPath !== aliasP) {
            changed = true;
            replacements.push({ from: aliasP, to: newPath });
        }
        return `${prefix}${quote}${newPath}${quote}`;
    }

    function repExportFrom(_m, prefix, quote, aliasP) {
        const newPath = computeRelative(filePath, aliasP);
        if (newPath !== aliasP) {
            changed = true;
            replacements.push({ from: aliasP, to: newPath });
        }
        return `${prefix}${quote}${newPath}${quote}`;
    }

    function repDynamicImport(_m, prefix, quote, aliasP, suffix) {
        const newPath = computeRelative(filePath, aliasP);
        if (newPath !== aliasP) {
            changed = true;
            replacements.push({ from: aliasP, to: newPath });
        }
        return `${prefix}${quote}${newPath}${quote}${suffix}`;
    }

    let newContent = content;
    newContent = newContent.replace(importFromRe, repImportFrom);
    newContent = newContent.replace(bareImportRe, repBareImport);
    newContent = newContent.replace(exportFromRe, repExportFrom);
    newContent = newContent.replace(dynamicImportRe, repDynamicImport);

    return { content: newContent, changed, replacements };
}

function isCodeFile(file) {
    return /\.(tsx?|jsx?)$/i.test(file);
}

function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files = [];
    for (const e of entries) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) {
            files.push(...walk(p));
        } else if (e.isFile() && isCodeFile(p)) {
            files.push(p);
        }
    }
    return files;
}

function main() {
    const files = walk(srcRoot);
    let filesChanged = 0;
    let importsChanged = 0;
    const changes = [];

    for (const fileAbs of files) {
        const relForLog = toPosix(path.relative(projectRoot, fileAbs));
        const original = fs.readFileSync(fileAbs, 'utf8');
        const { content: transformed, changed, replacements } = transformContent(original, relForLog);
        if (changed) {
            fs.writeFileSync(fileAbs, transformed, 'utf8');
            filesChanged++;
            importsChanged += replacements.length;
            changes.push({ file: relForLog, replacements });
        }
    }

    console.log(`Processed ${files.length} files under src`);
    console.log(`Updated ${filesChanged} files, ${importsChanged} import paths changed`);
    for (const c of changes) {
        console.log(`\n[${c.file}]`);
        for (const r of c.replacements) {
            console.log(`  ${r.from}  ->  ${r.to}`);
        }
    }
}

try {
    main();
} catch (err) {
    console.error('Error converting alias imports:', err);
    process.exit(1);
}