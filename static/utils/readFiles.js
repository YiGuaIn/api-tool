'use strict'
let path = require('path')
let fs = require('fs')
let glob = require('glob')
let regex = require('./regexp')
/**
 * @class 这是一个文件工具
 */
class FileTool {
    isFile (name) { // 判断文件是否存在
        if (!fs.existsSync(name)) return
        return fs.statSync(name).isFile()
    }
    /**
     * @param {String} name - 文件名
     */
    readFile (name) { // 读取文件
        if (!fs.existsSync(name)) return
        let file
        try {
            file = fs.readFileSync(name, 'utf-8')
        } catch (e) {
            throw new Error(e)
        }
        return file
    }
    getFiles (pattern) { // 获取指定文件名的所有文件
        let files = []
        try {
            files = glob.sync(pattern)
        } catch (e) {
            throw new Error(e)
        }
        return files
    }
    getFilesTotal (pattern) { // 获取指定文件的数量
        return this.getFiles(pattern).length
    }
}

let tool = new FileTool()
let arrs = []
let file = tool.readFile(process.cwd() + '/static/utils/util.js')
file = file.replace(/[\r\n]/g, '').replace(/^(\s*)/g, '')
arrs = file.toString().match(regex.SLICE_STAR_INNER)
console.log(arrs)
// file = regx.exec(file)[0].replace(/^(\s*)@(\S)/gm, '$1cls\\@$2')
// console.log(file.split('/**'))
// arrs = file.split('@')
// arrs.forEach(item => {
//     let tag = item.match(/^(\S+)(?:\s+(\S[\s\S]*))?/)
//     console.log(tag)
// })

