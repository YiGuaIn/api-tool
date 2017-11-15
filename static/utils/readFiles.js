'use strict'
let fs = require('fs')
let glob = require('glob')

class FileTool {
    isFile (name) { // 判断文件是否存在
        if (!fs.existsSync(name)) return false
        return fs.statSync(name).isFile()
    }
    mkFile (name, buff) {
        if (name === 'undefined' || name == null || name === '') throw Error
        let spilts = name.match(/\/.*/)[0]
        let dir = spilts.replace(/^(.*)\/[^\/]*$/, '$1')
        // let dirs = []
        // let file = ''
        // spilts.forEach(element => {
        //     if (element !== '') {
        //         if (element.endsWith('.html')) {
        //             file = element
        //         } else {
        //             dirs.push(element)
        //         }
        //     }
        // })
        // fs.readdir(process.cwd() + dir, (err, fd) => {
        //     if(err){
        //         if(err.code === 'ENOENT'){

        //         }
        //     }
        //     console.log(err)
        // })
        // fs.open(name, 'w+', (err, fd) => {
        //     // let file = fs.statSync(name)
        //     // console.log(file)
        //     console.log(err)
        //     // if (err) throw err
        //     // console.log(fd)
        //     // fs.write(name, fd, (err, fw) => {
        //     //     if (err) throw err
        //     // })
        // })
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

module.exports = new FileTool()
