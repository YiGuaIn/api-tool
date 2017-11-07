'use strict'
let path = require('path')
let fs = require('fs')
let glob = require('glob')

class FileTool {
    isFile(name){  // 判断文件是否存在
        if(!fs.existsSync(name)) return;
        return fs.statSync(name).isFile();
    }
    readFile(name){ // 读取文件
        if(!fs.existsSync(name)) return;
        let file;
        try{
            file = fs.readFileSync(name, 'utf-8')
        }catch(e){
            throw new Error(e)
        }
        return file
    }
    getFiles(pattern) { // 获取指定文件名的所有文件
        let files = []
        try{
            files = glob.sync(pattern);
        }catch(e){
            throw new Error(e)
        }
        return files
    }
    getFilesTotal(pattern) { // 获取指定文件的数量
        return this.getFiles(pattern).length;
    }
}

let tool = new FileTool();