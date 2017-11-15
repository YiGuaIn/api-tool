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
    sidebar('a').attr('href', '#' + item.name.trim())
    sidebar('a').attr('name', item.name.trim())
    sidebar('a').text(item.name.trim())
    content('a').attr('href', '#' + item.name.trim())
    content('a').attr('name', item.name.trim()) 
    content('a h2').attr('id', item.name.trim())
    content('.descript').text(item.descript.trim())
    content('.hostname').text(item.hostname.trim())
    content('.method').text(item.method.trim())
    sidebarText += sidebar('ul').html()
    contentText += content('body').html()
})
sidebarText = '<ul>' + sidebarText + '</ul>'
$('aside').text(sidebarText)
$('.content').text(contentText)
// fsTool.isFile(rootDir+ '/doc/api.html')
fsTool.mkFile(rootDir + '/doc/api.html')
