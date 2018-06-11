const fs = require('fs')
const through = require('through2');
const gutil = require('gulp-util');
const PluginError = gutil.PluginError;
const PLUGIN_NAME = 'gulp-assets-replace';

function replaceAssets(content, fileName) {
    const regExp = createReg(fileName)
    content = content.replace(regExp, fileName)
    return content
}

function createReg(fName) {
    const reg = /\.[a-zA-Z0-9]+(?=\.)/g
    const replaceReg = new RegExp(fName.replace(reg, '\\.[a-zA-Z0-9]+'), 'g')
    return replaceReg
}

function gulpAssetsReplace(options) {
    if (!options || !Array.isArray(options)) {
        throw new PluginError(PLUGIN_NAME, 'parameter must be an absolute file array!');
    }
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            cb(null, file);
        }
        let completeIndex = 0
        for (let i = 0; i < options.length; i++) {
            const fName = options[i]
            fs.readFile(fName, 'utf-8', function (err, data) {
                if (err) {
                    throw new PluginError(PLUGIN_NAME, err)
                }
                const newContent = replaceAssets(data, file.relative)
                fs.writeFile(fName, newContent, function (err) {
                    if (err) {
                        throw new PluginError(PLUGIN_NAME, err)
                    }
                    completeIndex++
                    if (completeIndex === options.length) {
                        cb(null, file);
                    }
                })
            })
        }       
    });
};

module.exports = gulpAssetsReplace;