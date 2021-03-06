let config = require('./config.json')
let fsTool = require('./readFiles')
let cheerio = require('cheerio')
let rootDir = process.cwd()
let file = rootDir + '/static/utils/util.js'
let name = rootDir + '/static/templates/default.tpl'
let sidebarTpl = rootDir + '/static/templates/sidebar.tpl'
let contentTpl = rootDir + '/static/templates/parag.tpl'
let sidebar = cheerio.load(fsTool.readFile(sidebarTpl), {decodeEntities: false})
let content = cheerio.load(fsTool.readFile(contentTpl), {decodeEntities: false})
let $ = cheerio.load(fsTool.readFile(name), {decodeEntities: false})
let {parseByFile} = require('./parser')

function generatorHtml () {
    let apiList = parseByFile(file)
    let sidebarText = ''
    let contentText = ''
    apiList.forEach((item, index) => {
        sidebar('a').attr('href', '#' + item.name.trim())
        sidebar('a').attr('name', item.name.trim())
        sidebar('a').text(item.name.trim())
        content('a').attr('href', '#' + item.name.trim())
        content('a').attr('name', item.name.trim()) 
        content('a h2').attr('id', item.name.trim())
        content('a h2').text(item.name.trim())
        content('.descript').text(item.descript.trim())
        content('.hostname').text(item.hostname.trim())
        content('.method').text(item.method.trim())
        let reqTr = ''
        let resTr = ''
        item.reqParams.forEach(el => {
            el = JSON.parse(el)
            reqTr += `<tr><td>${el.fieldName}</td><td>${el.fieldDesc}</td><td>${el.fieldType}</td><td></td></tr>`
        })
        item.resParams.forEach(el => {
            el = JSON.parse(el)
            resTr += `<tr><td>${el.fieldName}</td><td>${el.fieldDesc}</td><td>${el.fieldType}</td><td></td></tr>`
        })
        content('.request tbody').html(reqTr)
        content('.respone tbody').html(resTr)
        sidebarText += sidebar('ul').html()
        contentText += content('body').html()
    })
    sidebarText = '<ul>' + sidebarText + '</ul>'
    $('aside').text(sidebarText)
    $('.content').text(contentText)
    let apiFile = ''
    let apiDir = config.htmldir === '' ? 'doc' : config.htmldir
    let apihtml = config.htmlname === '' ? 'api.html' : config.htmlname
    switch (process.platform) {
    case 'win32':
        apiFile = '\\' + apiDir + '\\' + apihtml
        break
    case 'linux':
        apiFile = '/' + apiDir + '/' + apihtml
        break
    default:
        break
    }
    fsTool.generatorHtml(apiFile, $.html())
}

exports.generatorHtml = generatorHtml
