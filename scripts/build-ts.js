const fs = require('fs')
const path = require('path')
const glob = require('glob')
const { execSync } = require('child_process')

const UPDATE_AGING = 14 * 86400 * 1000

module.exports = function() {
    const src = path.resolve(__dirname, '../src')
    const lib = path.resolve(__dirname, '../publish/lib')
    fs.copyFileSync(path.join(src, 'index.js'), path.join(lib, 'index.d.ts'))
    const dirs = fs.readdirSync(src)
    .filter(dir => /[A-Z]/.test(dir[0]))
    glob.sync('*/*.d.ts', {
        cwd: src,
    }).forEach(file => fs.copyFileSync(path.join(src, file), path.join(lib, file)))
    dirs.forEach(dir => {
        const files = glob.sync('*.js', {
            cwd: path.join(src, dir)
        })
        files.forEach(filename => {
            let tsDeclear
            if (filename !== 'index.js' && !/[A-Z]/.test(filename[0])) return
            const declearFilename = `${path.basename(filename, path.extname(filename))}.d.ts`
            const srcPath = path.join(src, dir, filename)
            const targetPath = path.join(lib, dir, declearFilename)
            const srcFileMTime = +fs.statSync(srcPath).mtime
            const shouldUpdate = !fs.existsSync(targetPath) || Date.now() - srcFileMTime < UPDATE_AGING
            if (!shouldUpdate) return
            const transfer = `cat ${srcPath} | react2dts --top-level-module=false`
            if (filename === 'index.js' && !fs.existsSync(path.join(src, dir, 'index.d.ts'))) {
                tsDeclear = files.length === 1 ? 
                execSync(transfer)
                : fs.readFileSync(srcPath)
            } else if (/[A-Z]/.test(filename[0])) {
                tsDeclear = execSync(transfer)
            }
            if (!tsDeclear) return
            console.log(`react2dts: ${targetPath}`)
            fs.writeFileSync(targetPath, tsDeclear) 
        })
    })
}