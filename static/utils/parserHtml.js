let fsTool = require('./readFiles')
let cheerio = require('cheerio')
let rootDir = process.cwd()
let file = rootDir + '/static/utils/util.js'
let name = rootDir + '/static/templates/default.html'
let sidebarTpl = rootDir + '/static/templates/sidebar.tpl'
let contentTpl = rootDir + '/static/templates/parag.tpl'
let sidebar = cheerio.load(fsTool.readFile(sidebarTpl), {decodeEntities: false})
let content = cheerio.load(fsTool.readFile(contentTpl), {decodeEntities: false})
let $ = cheerio.load(fsTool.readFile(name), {decodeEntities: false})
let {parseByFile} = require('./parser')

let apiList = parseByFile(file)
let sidebarText = ''
let contentText = ''
apiList.forEach((item, index) => {
    sidebar('a').attr('href', '#' + item.name)
    content('a').attr('href', '#' + item.name)
    sidebar('a').attr('name', item.name)
    content('a').attr('name', item.name)
    sidebar('a').text(item.name)
    content('a h2').attr('id', item.name)
    content('.descript').text(item.descript)
    content('.hostname').text(item.hostname)
    content('.method').text(item.method)
    sidebarText += sidebar('ul').html()
    contentText += content('body').html()
})
sidebarText = '<ul>' + sidebarText + '</ul>'

// console.log()
// $('aside').text(tplText)
// $('.content').text(tplText)
// console.log($.html())
