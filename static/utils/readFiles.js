'use strict'

let fs = require('fs')
let path = require('path')
let glob = require('glob')

class FileTool {
    /**
     * 判断文件是否存在
     * @param {String} name 
     */
    isFile (name) {
        if (!fs.existsSync(name)) return false
        return fs.statSync(name).isFile()
    }
    /**
     * 生成Html业务
     * @param {String} name 
     * @param {Buffer} buff 
     */
    mkFile (name, buff) {
        if (name === 'undefined' || name == null || name === '') throw Error
        return new Promise((resolve, reject) => {
            let per = path.parse(name) 
            let dir = per.dir
            let filename = per.base
            let spilts = dir.split(/[/\\]/)
            let mkDir = process.cwd()
            spilts.forEach(elem => {
                if (elem === '') return false
                mkDir = path.join(mkDir, elem)
                if (fs.existsSync(mkDir)) return false
                fs.mkdir(mkDir, (err, files) => {
                    if (err) throw err
                })
            })
            filename = path.join(mkDir, filename)
            buff = Buffer.from(buff)
            let writeStream = fs.createWriteStream(filename)
            writeStream.on('open', _ => {
                writeStream.write(buff)
                writeStream.end()
            })
            writeStream.on('finish', _ => {
                writeStream.close()
            })
            writeStream.on('error', err => {
                console.log(err)
            })
        })
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
    /**
     * 获取指定文件名的所有文件
     * @param {String} pattern
     * @returns Array
     * @memberof FileTool
     */
    getFiles (pattern) {
        let files = []
        try {
            files = glob.sync(pattern)
        } catch (e) {
            throw new Error(e)
        }
        return files
    }
    /**
     * 获取指定文件的数量
     * @param {Array} pattern
     */
    getFilesTotal (pattern) {
        return this.getFiles(pattern).length
    }
    /**
     * 异步执行生成HTML文件
     */
    async generatorHtml (name, buff) {
        await this.mkFile(name, buff)
    }
}

module.exports = new FileTool()
